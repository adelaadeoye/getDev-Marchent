const db = require("../database/dbConfig.js");
module.exports = {
  addCart,
  updateCart,
  deleteCart,
  findAll,
  findById,
  findFilter
};

async function addCart(cartInfo) {
  const [id] = await db("cart").insert(cartInfo, "id");
  return findById(id);
}

async function deleteCart(id) {
  const deleted = await findById(id);
  await db("cart")
    .where({ id })
    .del();
  return deleted;
}

async function updateCart(id, changes) {
  await db("cart")
    .where({ id })
    .update(changes);
  const updated = await findById(id);
  return updated;
}

function findById(id) {
  return db("cart")
    .where({ id })
    .first();
}

async function findAll() {
  let allCarts = await db("cart").select("*");
  return allCarts;
}

async function findFilter(cust_id) {
  let result = await db("cart")
    .where("cust_id", cust_id)
    .first();
  return result;
}
