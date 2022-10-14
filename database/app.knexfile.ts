import knex, { Knex } from "knex";
import dotenv from 'dotenv';
dotenv.config();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      database: "ls_credit",
      user: "root",
      password: "bona2022",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: "sql5.freesqldatabase.com",
      port: 3306,
      database: "sql5526588",
      user: "sql5526588",
      password: "9z4aZrjuJf",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
export default knex(config[`${process.env.NODE_ENV}`]);
