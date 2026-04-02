import { openDB, type DBSchema } from "idb";
import type { Bundle } from "../types/bundles";
import type { Transaction } from "../types";
import type { UserBundle } from "../types/user";

export type DBKey = "bundles" | "transactions" | "userBundles";
// Minimal schema for type safety
export interface DataAppDB extends DBSchema {
  bundles: {
    key: string;
    value: Bundle;
    indexes: { "by-provider": string; "by-price": number };
  };
  transactions: {
    key: string;
    value: Transaction;
    indexes: { "by-timestamp": string };
  };
  userBundles: {
    key: string;
    value: UserBundle;
    indexes: { "by-phone": string };
  };
}

const dbInstance = openDB<DataAppDB>("dataAppDB", 1, {
  upgrade(db) {
    db.createObjectStore("userBundles", { keyPath: "id" });
    db.createObjectStore("bundles", { keyPath: "id" });
    db.createObjectStore("transactions", { keyPath: "id" });
  },
});

export default dbInstance;