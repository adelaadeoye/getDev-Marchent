exports.up = function(knex) {
  return knex.schema.createTable("product", tbl => {
    tbl.increments();

    tbl.varchar("prod_type", 24).notNullable();

    tbl.varchar("prod_name", 255).notNullable();

    tbl.varchar("prod_image_url",255).notNullable();

    tbl.integer("prod_price",255).notNullable();

    
    tbl
      .integer("merch_id", 255)
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("merchant")
      .onDelete("RESTRICT") // CASCADE, RESTRICT, DO NOTHING, SET NULL,
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("product");
};
