import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, { transform: postgres.toCamel });

export default sql;
