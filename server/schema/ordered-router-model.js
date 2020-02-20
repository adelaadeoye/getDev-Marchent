const db = require("../database/dbConfig.js");
module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  findAll,
  findById,
  findFilter
};

async function addOrder(ordered) {
  const [id] = await db("order").insert(ordered, "id");
  return findById(id);
}

async function deleteOrder(id) {
  const deleted = await findById(id);
  await db("order")
    .where({ id })
    .del();
  return deleted;
}

async function updateOrder(id, changes) {
  await db("order")
    .where({ id })
    .update(changes);
  const updated = await findById(id);
  return updated;
}

function findById(id) {
  return db("order")
    .where({ id })
    .first();
}

async function findAll() {
  let allOrdered = await db("order").select("*");
  return allOrdered;
}

async function findFilter(merch_id) {
  let result = await db("purchase")
    .where("merch_", merch_id).first();
  return result;
}
