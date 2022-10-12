import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("loan");
}
