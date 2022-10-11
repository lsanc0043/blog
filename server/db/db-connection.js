import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp("postgres://localhost:5432/blog");

export default db;
