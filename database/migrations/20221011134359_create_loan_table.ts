import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transaction", function (table) {
    table.increments("id").primary();
    table.integer("payer").notNullable();
    table.integer("receiver").notNullable();
    table.string("paymentRef", 255);
    table.double("amount").notNullable().defaultTo(0);
    table.timestamps(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transaction");
}
