import { openDB } from "idb";

const dbInstance = openDB("dataAppDB", 1, {
  upgrade(db) {
    db.createObjectStore("users", { keyPath: "id" });
    db.createObjectStore("bundles", { keyPath: "id" });
    db.createObjectStore("transactions", { keyPath: "id" });
  },
});

export default dbInstance;