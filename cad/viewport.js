import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CadViewport {
  constructor(container, onSelect) {
    this.container = container;
    this.onSelect = onSelect;
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
    this.down = null;
    this.renderer.domElement.addEventListener('pointerdown', (event) => {
      if (event.button === 0) this.down = [event.clientX, event.clientY];
    });
    this.renderer.domElement.addEventListener('pointerup', (event) => {
      if (!this.down || event.button !== 0) return;
      const distance = Math.hypot(event.clientX - this.down[0], event.clientY - this.down[1]);
      this.down = null;
      if (distance > 4) return;
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hit = this.raycaster.intersectObjects(this.parts.children, true).find((item) => item.object.isMesh);
      this.onSelect(hit?.object.userData.id ?? null, event.ctrlKey || event.metaKey || event.shiftKey);
    });
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
  }

  setDocument(document, result) {
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
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 24), new THREE.LineBasicMaterial({ color: '#243944', transparent: true, opacity: 0.85 }));
      edges.userData.id = object.id;
      const group = new THREE.Group();
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
    this.render();
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
