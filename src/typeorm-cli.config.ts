import { DataSource } from "typeorm";

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: "root",
    password: "",
    database: "iluvcoffee",
    entities: [],
    migrations: [],
});