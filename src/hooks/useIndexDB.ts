import dbInstance from "../services/db";

export function useIndexedDB<T>(storeName: string) {
  const getStore = async () => {
    const db = await dbInstance;
    // Check if the store exists in the database schema
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Store "${storeName}" does not exist in the database.`);
    }
    return db;
  };
  const add = async (item: T) => {
    const db = await getStore()
    // Use 'put' instead of 'add' if you want to overwrite existing keys
    return await db.add(storeName, item);
  };

  // Removed storeName param since it's already in the hook scope
  async function getItem(key: string): Promise<T | undefined> {
    const db = await getStore();
    return await db.get(storeName, key);
  }

  async function getAll(): Promise<T[]> {
    const db = await getStore();
    return await db.getAll(storeName);
  }

  // Bonus: Add a delete method
  async function removeItem(key: string) {
    const db = await getStore();
    await db.delete(storeName, key);
  }

  return { add, getItem, getAll, removeItem };
}
