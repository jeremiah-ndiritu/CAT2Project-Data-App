import dbInstance from "../services/db";
import type { DataAppDB, DBKey } from "../services/db";

export function useIndexedDB() {
  const getDB = async (storeName: keyof DataAppDB & DBKey) => {
    const db = await dbInstance;
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Store "${storeName}" does not exist.`);
    }
    return db;
  };

  // K extends keyof DataAppDB allows TS to "capture" the specific store name used
  const add = async <K extends keyof DataAppDB & DBKey>(
    storeName: K,
    item: DataAppDB[K]["value"],
  ) => {
    const db = await getDB(storeName);
    return db.add(storeName, item);
  };

  const put = async <K extends keyof DataAppDB & DBKey>(
    storeName: K,
    item: DataAppDB[K]["value"],
  ) => {
    const db = await getDB(storeName);
    return db.put(storeName, item);
  };

  const getItem = async <K extends keyof DataAppDB & DBKey>(
    storeName: K,
    key: string,
  ) => {
    const db = await getDB(storeName);
    // Returns the specific "value" type for that store
    return (await db.get(storeName, key)) as DataAppDB[K]["value"] | undefined;
  };

  const getAll = async <K extends keyof DataAppDB & DBKey>(storeName: K) => {
    const db = await getDB(storeName);
    return (await db.getAll(storeName)) as DataAppDB[K]["value"][];
  };

  const removeItem = async (
    storeName: keyof DataAppDB & DBKey,
    key: string,
  ) => {
    const db = await getDB(storeName);
    await db.delete(storeName, key);
  };

  const getByProvider = async (provider: string) => {
    const db = await getDB("bundles");
    return db.getAllFromIndex("bundles", "by-provider", provider) as Promise<
      DataAppDB["bundles"]["value"][]
    >;
  };

  return { add, put, getItem, getAll, removeItem, getByProvider };
}
