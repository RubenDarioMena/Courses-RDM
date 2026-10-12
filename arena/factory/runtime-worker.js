import { parse } from "acorn";
import { generate } from "astring";
let serial = 0;
const pending = new Map();
self.onmessage = async ({ data }) => {
  if (data.type === "reply") {
    const p = pending.get(data.id);
    pending.delete(data.id);
    if (p) data.error ? p.reject(new Error(data.error)) : p.resolve(data.value);
    return;
  }
  if (data.type !== "run") return;
  const rpc = (method, args = []) =>
    new Promise((resolve, reject) => {
      const id = ++serial;
      pending.set(id, { resolve, reject });
      self.postMessage({ type: "call", id, method, args });
    });
  try {
    const tree = parse(data.code, {
      ecmaVersion: "latest",
      allowAwaitOutsideFunction: true,
      locations: true,
    });
    // Instrument top-level and async function statements without changing synchronous functions.
    const mark = (line) => ({
      type: "ExpressionStatement",
      expression: {
        type: "AwaitExpression",
        argument: {
          type: "CallExpression",
          callee: { type: "Identifier", name: "__paso" },
          arguments: [{ type: "Literal", value: line }],
        },
      },
    });
    function walk(node, canAwait = true) {
      if (!node || typeof node !== "object") return;
      if (/Function/.test(node.type)) canAwait = !!node.async;
      if (
        (node.type === "Program" || node.type === "BlockStatement") &&
        canAwait
      ) {
        node.body = node.body.flatMap((stmt) => {
          walk(stmt, canAwait);
          return stmt.type === "FunctionDeclaration"
            ? [stmt]
            : [mark(stmt.loc?.start.line || 1), stmt];
        });
        return;
      }
      if (
        canAwait &&
        [
          "WhileStatement",
          "ForStatement",
          "ForOfStatement",
          "ForInStatement",
          "DoWhileStatement",
        ].includes(node.type) &&
        node.body.type !== "BlockStatement"
      )
        node.body = { type: "BlockStatement", body: [node.body] };
      for (const [key, val] of Object.entries(node)) {
        if (key === "loc") continue;
        if (Array.isArray(val)) val.forEach((x) => walk(x, canAwait));
        else if (val && typeof val === "object") walk(val, canAwait);
      }
    }
    walk(tree);
    const fabrica = Object.freeze(
      Object.fromEntries(
        [
          "activar",
          "desactivar",
          "velocidad",
          "esperar",
          "inventario",
          "maquinas",
          "entregar",
        ].map((name) => [name, (...args) => rpc(name, args)]),
      ),
    );
    const log = (...args) =>
      rpc(
        "log",
        args.map((v) => (typeof v === "string" ? v : JSON.stringify(v))),
      );
    const AsyncFunction = Object.getPrototypeOf(
      async function () {},
    ).constructor;
    await new AsyncFunction(
      "fabrica",
      "console",
      "__paso",
      `"use strict";\n${generate(tree)}`,
    )(fabrica, Object.freeze({ log, error: log, warn: log }), (line) =>
      rpc("paso", [line]),
    );
    self.postMessage({ type: "done" });
  } catch (error) {
    self.postMessage({
      type: "error",
      message: error.message,
      line: error.loc?.line,
    });
  }
};
