import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
        return knex.schema.createTable("account", function (table) {
        table.increments("id").primary();
        table.integer("userId").notNullable();
        table.double("balance").notNullable().defaultTo(0.0);
        table.timestamps(true);
    });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("account");
}


