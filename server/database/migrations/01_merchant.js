exports.up = function(knex) {
  return knex.schema.createTable("merchant", tbl => {
    tbl.increments();

    tbl
      .varchar("merch_name", 255)
      .notNullable()
      .unique();

    tbl
      .varchar("merch_store_name", 255)
      .notNullable();

    tbl
      .varchar("merch_email", 255)
      .notNullable()
      .unique();

    tbl.varchar("merch_password", 255).notNullable();

    tbl.integer("merch_account_balance", 255);
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("merchant");
};
