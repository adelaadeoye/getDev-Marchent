exports.up = function(knex) {
  return knex.schema.createTable("customer", tbl => {
    tbl.increments();

    tbl
      .varchar("cust_name", 255)
      .notNullable();

    tbl
      .varchar("cust_email", 255)
      .notNullable()
      .unique();

    tbl.varchar("cust_password", 255).notNullable();

   
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("customer");
};
