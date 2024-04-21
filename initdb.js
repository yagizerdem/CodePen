const Database = require("better-sqlite3");
const testDb = new Database("testdatabase.db", { verbose: console.log });
const productionDb = new Database("productiondatabase.db", {
  verbose: console.log,
});

function init() {
  // crate table schema
  createTestDatabase();
  createProductionDatabase();
}

function createTestDatabase() {
  testDb
    .prepare(
      `
    CREATE TABLE IF NOT EXISTS pens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL ,
        summary TEXT NOT NULL,
        htmlcode TEXT NOT NULL,
        csscode TEXT NOT NULL,
        jscode TEXT NOT NULL
    )
 `
    )
    .run();
  testDb
    .prepare(
      `
    CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        password TEXT NOT NULL,
        passwordagain TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,   
        role TEXT NOT NULL
    )
 `
    )
    .run();
}
function createProductionDatabase() {
  productionDb
    .prepare(
      `
    CREATE TABLE IF NOT EXISTS pens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL ,
        summary TEXT NOT NULL,
        htmlcode TEXT NOT NULL,
        csscode TEXT NOT NULL,
        jscode TEXT NOT NULL
    )
 `
    )
    .run();
  productionDb
    .prepare(
      `
    CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        password TEXT NOT NULL,
        passwordagain TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,   
        role TEXT NOT NULL
    )
 `
    )
    .run();
}

init();
