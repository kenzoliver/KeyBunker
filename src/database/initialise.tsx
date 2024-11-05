import {type SQLiteDatabase} from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase){
    await database.exeAsync(`
         CREATE TABLE IF NOT EXISTS passwords (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         label TEXT NOT NULL,
         login
         password TEX NOT NULL
         );
        `)
}