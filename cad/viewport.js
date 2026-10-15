import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { WORK_PLANES, cross, onPlane } from './planes.js';

export class CadViewport {
  constructor(container, onSelect, callbacks = {}) {
    this.container = container;
    this.onSelect = onSelect;
    this.callbacks = callbacks;
    this.mode = 'orbit';
    this.blocked = false;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#151c28');
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(100, -130, 105);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.setAttribute('aria-label', 'Vista 3D de las piezas. Arrastra para girar; rueda para acercar; botón derecho para desplazar.');
    this.renderer.domElement.tabIndex = 0;
    container.prepend(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.screenSpacePanning = true;
    this.controls.target.set(30, 20, 5);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 50000;
    this.controls.addEventListener('change', () => this.render());
    this.scene.add(new THREE.HemisphereLight(0xe5efff, 0x263848, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(80, -60, 150);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0x80baff, 1.2);
    fill.position.set(-80, 120, 60);
    this.scene.add(fill);
    this.grid = new THREE.GridHelper(400, 40, 0x455168, 0x273445);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.08;
    this.scene.add(this.grid);
    this.axes = new THREE.AxesHelper(24);
    this.axes.material.depthTest = false;
    this.axes.renderOrder = 2;
    this.scene.add(this.axes);
    this.parts = new THREE.Group();
    this.scene.add(this.parts);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.selected = new Set();
    this.pivot = new THREE.Object3D();
    this.scene.add(this.pivot);
    this.transform = new TransformControls(this.camera, this.renderer.domElement);
    this.transform.setSize(0.85);
    this.transform.setSpace('world');
    this.scene.add(this.transform.getHelper());
    this.transform.addEventListener('change', () => this.render());
    this.transform.addEventListener('dragging-changed', ({ value }) => { this.controls.enabled = !value; });
    this.transform.addEventListener('mouseDown', () => this.beginTransform());
    this.transform.addEventListener('objectChange', () => this.previewTransform());
    this.transform.addEventListener('mouseUp', () => this.finishTransform());
    this.decoration = new THREE.Group();
    this.scene.add(this.decoration);
    this.sketchDrawing = new THREE.Group();
    this.scene.add(this.sketchDrawing);
    this.faceHighlight = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: '#8de6c0', transparent: true, opacity: 0.4, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    this.faceHighlight.visible = false;
    this.scene.add(this.faceHighlight);
    this.down = null;
    this.renderer.domElement.addEventListener('pointerdown', (event) => this.pointerDown(event), true);
    this.renderer.domElement.addEventListener('pointermove', (event) => this.pointerMove(event), true);
    this.renderer.domElement.addEventListener('pointercancel', () => this.cancelGesture(), true);
    this.renderer.domElement.addEventListener('lostpointercapture', () => { if (this.freeDrag) this.cancelGesture(); });
    this.renderer.domElement.addEventListener('pointerup', (event) => {
      if (this.freeDrag) { this.finishTransform(); this.freeDrag = null; this.controls.enabled = true; this.renderer.domElement.releasePointerCapture(event.pointerId); return; }
      if (this.mode === 'sketch') { this.sketchPointer('up', event); this.down = null; return; }
      if (this.gesture || this.ignoreUp) { this.ignoreUp = false; this.down = null; return; }
      if (!this.down || event.button !== 0) return;
      const distance = Math.hypot(event.clientX - this.down[0], event.clientY - this.down[1]);
      this.down = null;
      if (distance > 4) return;
      this.updateRay(event);
      if (this.mode === 'plane') {
        const plane = this.raycaster.intersectObjects(this.decoration.children, true).find((hit) => hit.object.userData.plane);
        if (plane) this.callbacks.onPlane?.(WORK_PLANES[plane.object.userData.plane], plane.object.userData.plane);
        return;
      }
      const hit = this.partHit();
      if (this.mode === 'face') {
        const face = this.faceAt(hit);
        if (face?.plane) this.callbacks.onFace?.(hit.object.userData.id, face);
        else this.callbacks.onHint?.('Selecciona una cara plana del sólido. Las superficies curvas y las mallas STL no sirven como plano de croquis.');
        return;
      }
      this.onSelect(hit?.object.userData.id ?? null, event.ctrlKey || event.metaKey || event.shiftKey);
    }, true);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
  }

  setDocument(document, result) {
    this.cancelGesture();
    this.transform.detach();
    for (const group of [...this.parts.children]) {
      this.parts.remove(group);
      group.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((item) => item.dispose());
        else object.material?.dispose();
      });
    }
    const objects = new Map(document.objects.map((object) => [object.id, object]));
    for (const mesh of result.meshes ?? []) {
      const object = objects.get(mesh.id);
      if (!object || !object.visible || !mesh.positions?.length) continue;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(mesh.positions, 3));
      if (mesh.indices?.length) geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(mesh.indices), 1));
      if (mesh.normals?.length) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(mesh.normals, 3));
      else geometry.computeVertexNormals();
      geometry.computeBoundingSphere();
      const body = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: object.color ?? '#91b8c4', roughness: 0.42, metalness: 0.18, flatShading: mesh.isMesh === true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
      body.userData.id = object.id;
      body.userData.baseColor = object.color ?? '#91b8c4';
      body.userData.faces = mesh.faces || [];
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 24), new THREE.LineBasicMaterial({ color: '#243944', transparent: true, opacity: 0.85 }));
      edges.userData.id = object.id;
      const group = new THREE.Group();
      group.userData.id = object.id;
      group.add(body, edges);
      this.parts.add(group);
    }
    this.setSelection(this.selected);
    this.render();
  }

  setSelection(ids) {
    this.selected = new Set(ids);
    this.parts.traverse((object) => {
      if (object.isMesh) {
        const selected = this.selected.has(object.userData.id);
        object.material.color.set(selected ? '#79d9bb' : object.userData.baseColor);
        object.material.emissive.set(selected ? '#16392c' : '#000000');
      }
      if (object.isLineSegments && object.userData.id) object.material.color.set(this.selected.has(object.userData.id) ? '#b9f3d9' : '#243944');
    });
    this.attachTransform();
    this.render();
  }

  setMode(mode) {
    this.cancelGesture();
    this.mode = mode;
    this.faceHighlight.visible = false;
    this.clearGroup(this.decoration);
    this.controls.enabled = true;
    this.controls.mouseButtons.LEFT = ['orbit', 'face', 'plane'].includes(mode) ? THREE.MOUSE.ROTATE : null;
    this.renderer.domElement.style.cursor = ['face', 'plane', 'sketch'].includes(mode) ? 'crosshair' : mode === 'translate' ? 'grab' : 'default';
    if (mode === 'plane') {
      for (const [name, plane] of Object.entries(WORK_PLANES)) {
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({ color: { XY: '#639af5', XZ: '#6fdca5', YZ: '#ec8b94' }[name], transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }));
        mesh.applyMatrix4(this.planeMatrix(plane));
        mesh.userData.plane = name;
        this.decoration.add(mesh);
      }
    }
    this.attachTransform(); this.render();
  }

  setBlocked(value) {
    this.blocked = value;
    this.transform.enabled = !value;
    if (value) this.transform.detach(); else this.attachTransform();
  }

  attachTransform() {
    if (this.gesture) return;
    this.transform.detach();
    if (this.blocked || !['translate', 'rotate'].includes(this.mode) || this.selected.size !== 1) return;
    const group = this.parts.children.find((item) => this.selected.has(item.userData.id));
    if (!group) return;
    new THREE.Box3().setFromObject(group).getCenter(this.pivot.position);
    this.pivot.quaternion.identity(); this.pivot.updateMatrixWorld();
    this.transform.setMode(this.mode);
    this.transform.attach(this.pivot);
  }

  setSnap(enabled) {
    this.snap = enabled;
    this.transform.setTranslationSnap(enabled ? 1 : null);
    this.transform.setRotationSnap(enabled ? Math.PI / 12 : null);
  }

  beginTransform() {
    if (this.blocked || this.gesture) return;
    const group = this.parts.children.find((item) => this.selected.has(item.userData.id));
    if (!group) return;
    this.pivot.updateMatrix();
    this.gesture = { id: group.userData.id, group, start: this.pivot.matrix.clone(), delta: new THREE.Matrix4() };
    this.callbacks.onGesture?.(true);
  }

  previewTransform() {
    if (!this.gesture) return;
    this.pivot.updateMatrix();
    this.gesture.delta.copy(this.pivot.matrix).multiply(this.gesture.start.clone().invert());
    this.gesture.group.matrixAutoUpdate = false;
    this.gesture.group.matrix.copy(this.gesture.delta);
    this.gesture.group.matrixWorldNeedsUpdate = true;
    this.callbacks.onPreview?.(this.gesture.delta.elements);
    this.render();
  }

  finishTransform() {
    if (!this.gesture) return;
    const { id, delta } = this.gesture;
    this.gesture = null;
    this.down = null;
    this.callbacks.onGesture?.(false);
    if (delta.elements.some((value, i) => Math.abs(value - new THREE.Matrix4().elements[i]) > 1e-8)) this.callbacks.onTransform?.(id, delta.toArray());
    else this.attachTransform();
  }

  cancelGesture() {
    const active = Boolean(this.gesture || this.freeDrag || this.transform.dragging);
    if (this.gesture) { this.gesture.group.matrix.identity(); this.gesture.group.matrixWorldNeedsUpdate = true; this.gesture = null; }
    this.freeDrag = null; this.down = null;
    this.transform.reset(); this.transform.dragging = false; this.transform.axis = null;
    this.controls.enabled = true;
    if (active) { this.callbacks.onGesture?.(false); this.attachTransform(); this.render(); }
    return active;
  }

  updateRay(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }
  partHit() { return this.raycaster.intersectObjects(this.parts.children, true).find((item) => item.object.isMesh); }
  faceAt(hit) { return hit?.object.userData.faces?.find((face) => hit.faceIndex * 3 >= face.start && hit.faceIndex * 3 < face.start + face.count); }

  pointerDown(event) {
    if (event.button !== 0 || this.blocked) return;
    this.down = [event.clientX, event.clientY];
    if (this.mode === 'sketch') { event.stopImmediatePropagation(); this.renderer.domElement.setPointerCapture(event.pointerId); this.sketchPointer('down', event); return; }
    if (this.mode !== 'translate' || this.transform.axis) return;
    this.updateRay(event);
    const hit = this.partHit();
    if (!hit || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const id = hit.object.userData.id;
    if (!this.selected.has(id) || this.selected.size !== 1) this.onSelect(id, false);
    this.beginTransform();
    if (!this.gesture) return;
    event.stopImmediatePropagation();
    const normal = this.camera.getWorldDirection(new THREE.Vector3());
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, hit.point);
    this.freeDrag = { plane, start: hit.point.clone(), position: this.pivot.position.clone() };
    this.controls.enabled = false;
    this.renderer.domElement.setPointerCapture(event.pointerId);
  }

  pointerMove(event) {
    if (this.blocked) return;
    this.updateRay(event);
    if (this.freeDrag) {
      const point = this.raycaster.ray.intersectPlane(this.freeDrag.plane, new THREE.Vector3());
      if (point) {
        const offset = point.sub(this.freeDrag.start);
        if (this.snap) ['x', 'y', 'z'].forEach((axis) => { offset[axis] = Math.round(offset[axis]); });
        this.pivot.position.copy(this.freeDrag.position).add(offset); this.previewTransform();
      }
      event.stopImmediatePropagation(); return;
    }
    if (this.mode === 'sketch') { this.sketchPointer('move', event); return; }
    if (this.mode !== 'face') return;
    const hit = this.partHit(), face = this.faceAt(hit);
    this.faceHighlight.visible = Boolean(face?.plane);
    if (face?.plane) {
      const source = hit.object.geometry, positions = [];
      for (let i = face.start; i < face.start + face.count; i++) {
        const index = source.index.getX(i);
        positions.push(source.attributes.position.getX(index), source.attributes.position.getY(index), source.attributes.position.getZ(index));
      }
      this.faceHighlight.geometry.dispose();
      this.faceHighlight.geometry = new THREE.BufferGeometry();
      this.faceHighlight.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    }
    this.render();
  }

  planeMatrix(plane) {
    const normal = cross(plane.u, plane.v);
    return new THREE.Matrix4().makeBasis(new THREE.Vector3(...plane.u), new THREE.Vector3(...plane.v), new THREE.Vector3(...normal)).setPosition(...plane.origin);
  }
  clearGroup(group) {
    for (const child of [...group.children]) { group.remove(child); child.traverse((item) => { item.geometry?.dispose(); item.material?.dispose(); }); }
  }

  beginSketch(plane, onPointer, focus = null) {
    this.setMode('sketch');
    this.sketchPlane = plane;
    this.onSketchPointer = onPointer;
    this.oldCamera = { position: this.camera.position.clone(), up: this.camera.up.clone(), target: this.controls.target.clone() };
    this.mainGridVisible = this.grid.visible;
    this.grid.visible = false;
    const target = focus ? new THREE.Vector3(...focus) : new THREE.Vector3(...plane.origin);
    const normal = new THREE.Vector3(...cross(plane.u, plane.v));
    this.camera.position.copy(target).addScaledVector(normal, Math.max(100, this.camera.position.distanceTo(this.controls.target)));
    this.camera.up.set(...plane.v); this.controls.target.copy(target); this.controls.update();
    const grid = new THREE.GridHelper(400, 80, '#557f8c', '#2c414d');
    grid.material.depthTest = false; grid.material.transparent = true; grid.material.opacity = 0.5; grid.renderOrder = 2;
    grid.rotation.x = Math.PI / 2; grid.updateMatrix();
    const group = new THREE.Group(); group.add(grid); group.applyMatrix4(this.planeMatrix(plane));
    this.decoration.add(group);
    this.parts.traverse((item) => { if (item.isMesh) { item.material.transparent = true; item.material.opacity = 0.32; item.material.depthWrite = false; item.material.side = THREE.FrontSide; } });
    this.render();
  }

  sketchPointer(type, event) {
    if (!this.sketchPlane) return;
    this.updateRay(event);
    const plane = this.sketchPlane;
    const normal = new THREE.Vector3(...cross(plane.u, plane.v));
    const point = this.raycaster.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(normal, new THREE.Vector3(...plane.origin)), new THREE.Vector3());
    if (!point) return;
    point.sub(new THREE.Vector3(...plane.origin));
    this.onSketchPointer?.(type, [point.dot(new THREE.Vector3(...plane.u)), point.dot(new THREE.Vector3(...plane.v))], event);
  }

  drawProfile(profile, height = 0, reverse = false) {
    this.clearGroup(this.sketchDrawing);
    if (!this.sketchPlane) return;
    const points = profile.circle ? Array.from({ length: 97 }, (_, i) => [profile.circle.center[0] + Math.cos(i / 96 * Math.PI * 2) * profile.circle.radius, profile.circle.center[1] + Math.sin(i / 96 * Math.PI * 2) * profile.circle.radius]) : profile.points || [];
    if (!points.length) { this.render(); return; }
    const world = points.map((point) => new THREE.Vector3(...onPlane(this.sketchPlane, ...point)));
    if (profile.closed) world.push(world[0].clone());
    // El croquis se dibuja después de las piezas transparentes, incluso si la pieza está seleccionada.
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(world), new THREE.LineBasicMaterial({ color: '#ffcf79', transparent: true, opacity: 1, depthTest: false }));
    line.renderOrder = 4; this.sketchDrawing.add(line);
    const handles = profile.circle ? [profile.circle.center, [profile.circle.center[0] + profile.circle.radius, profile.circle.center[1]]] : profile.points || [];
    const dots = new THREE.Points(new THREE.BufferGeometry().setFromPoints(handles.map((point) => new THREE.Vector3(...onPlane(this.sketchPlane, ...point)))), new THREE.PointsMaterial({ color: '#ffe2a9', transparent: true, opacity: 1, size: 7, sizeAttenuation: false, depthTest: false }));
    dots.renderOrder = 5; this.sketchDrawing.add(dots);
    if (profile.closed && points.length > 2 && height > 0) {
      const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: height * (reverse ? -1 : 1), bevelEnabled: false, steps: 1 });
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#ffc66e', transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthWrite: false }));
      mesh.applyMatrix4(this.planeMatrix(this.sketchPlane)); this.sketchDrawing.add(mesh);
    }
    this.render();
  }

  endSketch() {
    this.sketchPlane = null; this.onSketchPointer = null;
    this.clearGroup(this.sketchDrawing);
    this.parts.traverse((item) => { if (item.isMesh) { item.material.transparent = false; item.material.opacity = 1; item.material.depthWrite = true; item.material.side = THREE.DoubleSide; } });
    if (this.mainGridVisible !== undefined) this.grid.visible = this.mainGridVisible;
    if (this.oldCamera) {
      this.camera.position.copy(this.oldCamera.position); this.camera.up.copy(this.oldCamera.up); this.controls.target.copy(this.oldCamera.target); this.controls.update(); this.oldCamera = null;
    }
    this.setMode('orbit');
  }

  fit() {
    const bounds = new THREE.Box3().setFromObject(this.parts);
    if (bounds.isEmpty()) return;
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const distance = Math.max(size.x, size.y, size.z, 10) / Math.sin(THREE.MathUtils.degToRad(this.camera.fov / 2)) * 0.72 / Math.min(this.camera.aspect, 1);
    this.controls.maxDistance = Math.max(50000, distance * 10);
    const direction = this.camera.position.clone().sub(this.controls.target).normalize();
    this.controls.target.copy(center);
    this.camera.position.copy(center).addScaledVector(direction, distance);
    this.camera.near = Math.max(distance / 10000, 0.01);
    this.camera.far = Math.max(distance * 100, 1000);
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.render();
  }

  view(direction) {
    const distance = this.camera.position.distanceTo(this.controls.target);
    const directions = { iso: [1, -1.4, 1.1], top: [0, 0.001, 1], front: [0, -1, 0.001], right: [1, 0, 0.001] };
    this.camera.position.copy(this.controls.target).addScaledVector(new THREE.Vector3(...directions[direction]).normalize(), distance);
    this.controls.update();
    this.render();
  }

  toggleGrid() { this.grid.visible = !this.grid.visible; this.render(); return this.grid.visible; }
  resize() {
    const { width, height } = this.container.getBoundingClientRect();
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
  }
  render() { this.renderer.render(this.scene, this.camera); }
}
