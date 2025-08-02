import { SheetData, DatabaseConfig } from "@/types/scoresheet";

const DB_CONFIG: DatabaseConfig = {
    name: "ScoresheetDB",
    storeName: "sheet",
    version: 2,
};

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
                db.createObjectStore(DB_CONFIG.storeName, { keyPath: "id" });
            }
        };
    });
};

export const getSheet = async (): Promise<SheetData> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_CONFIG.storeName, "readonly");
        const store = tx.objectStore(DB_CONFIG.storeName);
        const req = store.get("main");

        req.onsuccess = () => {
            if (req.result) {
                resolve(req.result.data as SheetData);
            } else {
                resolve({ players: [], scores: [] }); // Start empty
            }
        };

        req.onerror = () => reject(req.error);
    });
};

export const saveSheet = async (data: SheetData): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_CONFIG.storeName, "readwrite");
        const store = tx.objectStore(DB_CONFIG.storeName);

        store.put({ id: "main", data });

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};
