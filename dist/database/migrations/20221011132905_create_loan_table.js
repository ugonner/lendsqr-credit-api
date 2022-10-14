"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("loan", function (table) {
            table.increments("id").primary();
            table.integer("lender").notNullable();
            table.integer("borrower");
            table.boolean("claimed").defaultTo(false);
            table.boolean("repaid").defaultTo(false);
            table.string("loanType", 255);
            table.string("dueDate", 255);
            table.double("duration").notNullable().defaultTo(1);
            table.double("rate").notNullable().defaultTo(1);
            table.double("amount").notNullable().defaultTo(0);
            table.double("amountPaid").notNullable().defaultTo(0);
            table.double("totalAmount").notNullable().defaultTo(0);
            table.timestamps(true);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("loan");
    });
}
exports.down = down;
