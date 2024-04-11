// Importeer de benodigde modules
import sqlite3 from 'sqlite3';

// Open de databaseverbinding (of maak deze aan als deze nog niet bestaat)
const db = new sqlite3.Database('chat_history.db');

// Maak de tabel aan als deze nog niet bestaat
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            content TEXT
        );
    `);
});

// Sluit de databaseverbinding
db.close();
