exports.up = function(knex) {
  return knex.schema.createTable("purchase", tbl => {
    tbl.increments();


    tbl.varchar("prod_name", 255).notNullable();

    tbl.integer("prod_price",255).notNullable();

    tbl.varchar("prod_image_url",255).notNullable();


    
    tbl
      .integer("merch_id", 255)
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("merchant")
      .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL,
      .onUpdate("CASCADE");

    tbl
      .integer("prod_id", 255)
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("product")
      .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL,
      .onUpdate("CASCADE");

    tbl
      .integer("cust_id", 255)
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("customer")
      .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL,
      .onUpdate("CASCADE");
  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("purchase");
};
