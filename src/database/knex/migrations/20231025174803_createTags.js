
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.integer("user_id").references("id").inTable("users")
  table.integer("movie_id").references("id").inTable("movie").onDelete("CASCADE")

});

exports.down = knex => knex.schema.dropTable("tags");
