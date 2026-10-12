import { createDatabase, syncDatabase, dumpDatabase } from "./database.js";
let db,
  queue = Promise.resolve();
self.onmessage = ({ data }) => {
  queue = queue.then(async () => {
    try {
      let value;
      if (data.method === "init") {
        db = await createDatabase(data.bytes);
        value = true;
      }
      if (!db) throw new Error("La base de datos todavía no está preparada.");
      if (data.method === "query") {
        await syncDatabase(db, data.state);
        await db.exec("SET statement_timeout = '5s'");
        value = await db.transaction((tx) => tx.exec(data.sql));
        value = value.map((r) => ({
          ...r,
          rows: r.rows.slice(0, 200),
          total: r.rows.length,
        }));
      }
      if (data.method === "pedido")
        value =
          (await db.query("SELECT * FROM pedidos WHERE id=$1", [data.pedido]))
            .rows[0] || null;
      if (data.method === "entregar")
        value = (
          await db.query(
            "UPDATE pedidos SET entregado=true WHERE id=$1 AND entregado=false RETURNING id",
            [data.pedido],
          )
        ).rows.length;
      if (data.method === "export") {
        await syncDatabase(db, data.state);
        value = await dumpDatabase(db);
      }
      if (data.method === "snapshot") value = await dumpDatabase(db);
      self.postMessage({ id: data.id, value });
    } catch (e) {
      self.postMessage({ id: data.id, error: e.message });
    }
  });
};
