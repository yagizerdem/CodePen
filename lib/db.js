import sql from "better-sqlite3";
const db = sql(process.env.DBNAME);
export function registerNewUser(data) {
  console.log(data);
  console.log(db);
}

export function getUserByEmail(email) {
  // check user exist on db
}
