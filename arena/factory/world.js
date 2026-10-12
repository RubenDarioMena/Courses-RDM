import { Application, Container, Graphics, Text } from "pixi.js";
import { SIZE, TYPES, DIRS, status } from "./model.js";
export const TILE = 78;
const ink = 0x102638,
  edge = 0x284b65;
function text(value, x, y, size = 12, color = 0xa3bccd) {
  const t = new Text({
    text: value,
    style: {
      fontFamily: "Arial, sans-serif",
      fontSize: size,
      fill: color,
      fontWeight: "500",
      letterSpacing: 0.6,
    },
  });
  t.position.set(x, y);
  return t;
}
function rect(g, x, y, w, h, r, color, stroke) {
  g.roundRect(x, y, w, h, r).fill(color);
  if (stroke) g.stroke({ color: stroke, width: 1.5 });
}
export async function createWorld(element, handlers) {
  const app = new Application();
  await app.init({
    resizeTo: element,
    background: 0x091b2b,
    antialias: true,
    resolution: Math.min(devicePixelRatio, 2),
    autoDensity: true,
  });
  element.append(app.canvas);
  app.canvas.setAttribute(
    "aria-label",
    "Fábrica: usa las herramientas para construir y arrastra el terreno para mover la cámara.",
  );
  const camera = new Container(),
    floor = new Graphics(),
    decor = new Container(),
    machines = new Container(),
    dynamic = new Graphics(),
    overlay = new Graphics();
  app.stage.addChild(camera);
  camera.addChild(floor, decor, machines, dynamic, overlay);
  for (let y = 0; y < SIZE.height; y++)
    for (let x = 0; x < SIZE.width; x++) {
      floor
        .rect(x * TILE, y * TILE, TILE - 2, TILE - 2)
        .fill((x + y) % 3 === 0 ? 0x102b41 : 0x0d2539);
      floor.circle(x * TILE + 6, y * TILE + 6, 1.2).fill(0x24445b);
    }
  floor
    .rect(0, 0, SIZE.width * TILE, SIZE.height * TILE)
    .stroke({ width: 3, color: 0x31506a });
  decor.addChild(
    text("SECTOR 01  /  PRODUCCIÓN", 8 * TILE, 4.9 * TILE, 15, 0x8ca9ba),
  );
  decor.addChild(
    text("COBRE → PLACAS → CIRCUITOS", 8 * TILE, 5.3 * TILE, 11, 0x51758f),
  );
  decor.addChild(
    text("ESPACIO DE EXPANSIÓN", 8 * TILE, 12 * TILE, 13, 0x3f637b),
  );
  const map = new Map();
  let state,
    selected,
    tool = null,
    direction = 0,
    hover = null;
  function resetCamera() {
    const w = element.clientWidth,
      h = element.clientHeight;
    const zoom = Math.min(1.07, Math.max(0.55, (w - 455) / (12 * TILE)));
    camera.scale.set(zoom);
    camera.position.set(
      440 - 7.6 * TILE * zoom,
      Math.max(80, (h - 4 * TILE * zoom) / 2) - 6 * TILE * zoom,
    );
  }
  resetCamera();
  function make(n, inputs, signature) {
    const c = new Container(),
      g = new Graphics(),
      motion = new Graphics();
    c.position.set(n.x * TILE + TILE / 2, n.y * TILE + TILE / 2);
    c.addChild(g, motion);
    if (n.type === "cinta" && inputs.some((d) => d !== (n.dir + 2) % 4)) {
      const [ox, oy] = DIRS[n.dir];
      for (const direction of inputs) {
        const [ix, iy] = DIRS[direction];
        for (const [width, color] of [
          [42, 0x061421],
          [36, 0x48637a],
          [30, 0x28435a],
          [24, 0x112235],
        ])
          g.moveTo(ix * 40, iy * 40)
            .lineTo(0, 0)
            .lineTo(ox * 40, oy * 40)
            .stroke({ width, color, join: "round", cap: "butt" });
      }
    } else if (n.type === "cinta") {
      const base = new Container(),
        b = new Graphics();
      base.rotation = (n.dir * Math.PI) / 2;
      rect(b, -40, -19, 80, 44, 7, 0x061421);
      rect(b, -40, -20, 80, 36, 5, 0x28435a, 0x48637a);
      rect(b, -40, -14, 80, 24, 3, 0x112235);
      for (let x = -36; x < 40; x += 12) b.rect(x, -13, 3, 22).fill(0x293f52);
      b.moveTo(-40, -20).lineTo(40, -20).stroke({ color: 0x7290a5, width: 2 });
      b.moveTo(-40, 16).lineTo(40, 16).stroke({ color: 0x405d74, width: 2 });
      base.addChild(b);
      c.addChildAt(base, 0);
    } else {
      const col = TYPES[n.type].color;
      rect(g, -34, -26, 70, 69, 10, 0x040d17);
      rect(g, -35, -34, 70, 67, 9, 0x132a3c, 0x3c6078);
      rect(g, -29, -31, 58, 52, 6, 0x264357, 0x49657a);
      g.moveTo(-25, -31).lineTo(25, -31).stroke({ color: 0x71909c, width: 2 });
      rect(g, -23, -24, 46, 34, 4, 0x0b1d2d, 0x3e5b72);
      for (const x of [-29, 29])
        for (const y of [-27, 26]) g.circle(x, y, 2).fill(0x7b93a4);
      rect(g, -19, 17, 38, 5, 2, 0x0c1d2a);
      g.rect(-16, 18, 14, 2).fill(col);
      const [dx, dy] = DIRS[n.dir];
      g.circle(dx * 34, dy * 34, 6)
        .fill(0x0b1b27)
        .stroke({ width: 2, color: col });
      if (n.type === "extractor") {
        g.poly([-12, -10, 0, -20, 13, -10, 0, 5]).fill(0x62d7d2);
        g.poly([-12, -10, 0, -4, 0, 5]).fill(0x239493);
        g.moveTo(-15, 29).lineTo(15, 29).stroke({ color: col, width: 2 });
      }
      if (n.type === "fundidor") {
        rect(g, -17, -19, 34, 24, 4, 0x512d27, 0xc67a45);
        for (let x = -11; x < 13; x += 8) g.rect(x, -15, 4, 16).fill(0xffa561);
      }
      if (n.type === "ensamblador") {
        rect(g, -13, -19, 26, 24, 4, 0x7962ac, 0xc7b3ff);
        rect(g, -7, -13, 14, 12, 2, 0xb19be2);
        for (let x = -20; x < 24; x += 10) {
          g.rect(x, -24, 4, 5).fill(0x896fb6);
          g.rect(x, 9, 4, 5).fill(0x896fb6);
        }
      }
      if (n.type === "almacen") {
        for (let x = -18; x < 20; x += 13) {
          rect(g, x, -19, 10, 24, 2, 0x37574b, 0x91c49a);
        }
        g.moveTo(-21, -7).lineTo(21, -7).stroke({ color: 0x91c49a, width: 2 });
      }
      const label = text(
        TYPES[n.type].name.toUpperCase(),
        0,
        -63,
        10,
        0xc1d4df,
      );
      label.anchor.set(0.5, 0);
      c.addChild(label);
      const id = text(n.id, 0, 43, 10, 0x7898ad);
      id.anchor.set(0.5, 0);
      c.addChild(id);
    }
    machines.addChild(c);
    map.set(n.id, {
      c,
      motion,
      dir: n.dir,
      signature,
      corner: inputs.some((d) => d !== (n.dir + 2) % 4),
    });
    return map.get(n.id);
  }
  function material(g, name, x, y, size = 8) {
    const color = { cobre: 0xf3ae72, placa: 0xa9d4e5, circuito: 0xb5a0ff }[
      name
    ];
    g.roundRect(x - size + 2, y - size + 4, size * 2, size * 2, 3).fill({
      color: 0x020b12,
      alpha: 0.55,
    });
    g.roundRect(x - size, y - size, size * 2, size * 2, 3)
      .fill(color)
      .stroke({ color: 0xe2f1eb, width: 1 });
    if (name === "circuito") {
      g.rect(x - 3, y - 3, 6, 6).fill(0x615283);
      g.moveTo(x - 6, y)
        .lineTo(x + 6, y)
        .stroke({ width: 1, color: 0xe1d5ff });
    }
    if (name === "placa")
      g.moveTo(x - size + 3, y - 3)
        .lineTo(x + size - 3, y - 3)
        .stroke({ color: 0xf0f8ff, width: 2 });
  }
  function render(s, selection) {
    state = s;
    selected = selection;
    for (const [id, o] of map)
      if (!s.nodes.some((n) => n.id === id)) {
        o.c.destroy({ children: true });
        map.delete(id);
      }
    dynamic.clear();
    overlay.clear();
    const grid = new Map(s.nodes.map((n) => [`${n.x},${n.y}`, n]));
    for (const n of s.nodes) {
      const inputs =
        n.type === "cinta"
          ? DIRS.flatMap(([dx, dy], d) => {
              const prev = grid.get(`${n.x + dx},${n.y + dy}`);
              return prev && prev.dir === (d + 2) % 4 && prev.type !== "almacen"
                ? [d]
                : [];
            })
          : [];
      if (!inputs.length) inputs.push((n.dir + 2) % 4);
      const signature = `${n.dir}:${inputs.join(",")}`;
      let o = map.get(n.id);
      if (o && o.signature !== signature) {
        o.c.destroy({ children: true });
        map.delete(n.id);
        o = null;
      }
      o = o || make(n, inputs, signature);
      const g = o.motion;
      g.clear();
      const col = TYPES[n.type].color;
      if (n.type === "cinta") {
        g.rotation = (n.dir * Math.PI) / 2;
        for (let i = o.corner ? 0 : -1; i <= 1; i++) {
          const x = i * 24 + (n.enabled ? (s.time * 18) % 24 : 0) - 12;
          g.moveTo(x - 4, -5)
            .lineTo(x + 2, 0)
            .lineTo(x - 4, 5)
            .stroke({ width: 2, color: 0x6989a0, alpha: 0.7 });
        }
      } else {
        g.circle(23, 20, 3).fill(n.enabled ? col : 0x53606c);
        if (n.enabled && n.progress > 0) {
          g.roundRect(-35, -34, 70, 67, 9).stroke({
            color: col,
            width: 2,
            alpha: 0.2 + Math.sin(s.time * 3) * 0.1,
          });
          g.rect(-18, 17, 36 * n.progress, 4).fill(col);
        }
        if (n.type === "extractor" && n.enabled) {
          const angle = s.time * 1.6;
          g.moveTo(Math.cos(angle) * 14, Math.sin(angle) * 8 - 8)
            .lineTo(-Math.cos(angle) * 14, -Math.sin(angle) * 8 - 8)
            .stroke({ color: 0x143a45, width: 4 });
        }
        if (n.type === "ensamblador" && n.enabled && n.progress > 0) {
          const t = Math.sin(n.progress * Math.PI);
          g.moveTo(-26, -10)
            .lineTo(-19 + t * 11, -4)
            .lineTo(-8 + t * 6, -8)
            .stroke({ color: 0xd0baff, width: 5 });
          g.moveTo(26, -10)
            .lineTo(19 - t * 11, -4)
            .lineTo(8 - t * 6, -8)
            .stroke({ color: 0x7dd9e0, width: 5 });
        }
      }
      const cx = n.x * TILE + TILE / 2,
        cy = n.y * TILE + TILE / 2;
      if (n.output) material(dynamic, n.output, cx, cy, 6);
      if (n.input.length && n.type === "cinta")
        material(dynamic, n.input[0], cx, cy, 7);
      if (n.id === selected)
        overlay
          .roundRect(n.x * TILE - 3, n.y * TILE - 5, TILE + 6, TILE + 10, 12)
          .stroke({ width: 2, color: 0x90f4da });
    }
    for (const p of s.packets) {
      const a = s.nodes.find((n) => n.id === p.from),
        b = s.nodes.find((n) => n.id === p.to);
      if (a && b)
        material(
          dynamic,
          p.material,
          (a.x + (b.x - a.x) * p.progress) * TILE + TILE / 2,
          (a.y + (b.y - a.y) * p.progress) * TILE + TILE / 2,
          8,
        );
    }
    if (tool && hover) {
      const { x, y } = hover;
      overlay
        .roundRect(x * TILE + 4, y * TILE + 4, TILE - 8, TILE - 8, 8)
        .fill({ color: tool === "remove" ? 0xff8585 : 0x7df2da, alpha: 0.12 })
        .stroke({ color: tool === "remove" ? 0xff8585 : 0x7df2da, width: 2 });
      if (tool !== "remove") {
        const cx = x * TILE + 39,
          cy = y * TILE + 39,
          [dx, dy] = DIRS[direction];
        overlay
          .moveTo(cx - dx * 15, cy - dy * 15)
          .lineTo(cx + dx * 15, cy + dy * 15)
          .stroke({ color: 0x8de5d4, width: 4 });
      }
    }
  }
  function local(e) {
    const r = app.canvas.getBoundingClientRect();
    return camera.toLocal({ x: e.clientX - r.left, y: e.clientY - r.top });
  }
  let drag = null;
  app.canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 && e.button !== 1 && e.button !== 2) return;
    app.canvas.setPointerCapture(e.pointerId);
    drag = {
      x: e.clientX,
      y: e.clientY,
      cx: camera.x,
      cy: camera.y,
      moved: false,
      button: e.button,
    };
  });
  app.canvas.addEventListener("pointermove", (e) => {
    const p = local(e);
    hover = { x: Math.floor(p.x / TILE), y: Math.floor(p.y / TILE) };
    if (drag) {
      const dx = e.clientX - drag.x,
        dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
      if (drag.moved) {
        camera.position.set(drag.cx + dx, drag.cy + dy);
      }
    }
  });
  app.canvas.addEventListener("pointerup", (e) => {
    if (drag && !drag.moved && drag.button === 0) {
      const p = local(e);
      handlers.click(Math.floor(p.x / TILE), Math.floor(p.y / TILE));
    }
    drag = null;
  });
  app.canvas.addEventListener("pointercancel", () => (drag = null));
  app.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  app.canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const p = local(e),
        r = app.canvas.getBoundingClientRect(),
        z = Math.max(
          0.4,
          Math.min(1.8, camera.scale.x * (e.deltaY > 0 ? 0.9 : 1.1)),
        );
      camera.scale.set(z);
      camera.position.set(
        e.clientX - r.left - p.x * z,
        e.clientY - r.top - p.y * z,
      );
    },
    { passive: false },
  );
  return {
    app,
    render,
    resetCamera,
    setTool(t, d) {
      tool = t;
      direction = d;
    },
    zoom(f) {
      const x = element.clientWidth / 2,
        y = element.clientHeight / 2,
        p = camera.toLocal({ x, y }),
        z = Math.max(0.4, Math.min(1.8, camera.scale.x * f));
      camera.scale.set(z);
      camera.position.set(x - p.x * z, y - p.y * z);
    },
    get zoomLevel() {
      return Math.round(camera.scale.x * 100);
    },
  };
}
