import { validateFactory } from "./model.js";
export const KEY = "arena.factory.v1";
export function validateSession(data) {
  if (
    !data ||
    data.format !== "arena-factory" ||
    data.version !== 1 ||
    typeof data.code !== "string" ||
    data.code.length > 100000 ||
    typeof data.sql !== "string" ||
    data.sql.length > 100000
  )
    throw new Error("Selecciona una sesión de Arena Factory (.json).");
  return { ...data, factory: validateFactory(data.factory) };
}
export function snapshot(factory, code, sql) {
  return {
    format: "arena-factory",
    version: 1,
    savedAt: new Date().toISOString(),
    factory: structuredClone(factory),
    code,
    sql,
  };
}
export function loadLocal() {
  const s = localStorage.getItem(KEY);
  return s ? validateSession(JSON.parse(s)) : null;
}
export function saveLocal(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("arena-sql-v1", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("session");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
export async function storeDatabase(bytes) {
  const db = await open();
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction("session", "readwrite");
      tx.objectStore("session").put(bytes, "database");
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
export async function loadDatabase() {
  const db = await open();
  try {
    return await new Promise((resolve, reject) => {
      const req = db
        .transaction("session")
        .objectStore("session")
        .get("database");
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}
