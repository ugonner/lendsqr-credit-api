"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Update with your config settings.
const config = {
    development: {
        client: "mysql2",
        connection: {
            host: '127.0.0.1',
            port: 3306,
            database: 'ls_credit',
            user: 'root',
            password: "bona2022",
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "mysql2",
        connection: {
            host: "http://sql5.freesqldatabase.com/",
            port: "3306",
            database: "sql5526588",
            user: "sql5526588",
            password: "9z4aZrjuJf"
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
exports.default = (0, knex_1.default)(config["development"]);
