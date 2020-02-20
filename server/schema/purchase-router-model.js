const db = require("../database/dbConfig.js");
module.exports = {
  addPurchase,
  updatePurchase,
  deletePurchase,
  findAll,
  findById,
  findFilter
};

async function addPurchase(purchased) {
  const [id] = await db("purchase").insert(purchased, "id");
  return findById(id);
}

async function deletePurchase(id) {
  const deleted = await findById(id);
  await db("purchase")
    .where({ id })
    .del();
  return deleted;
}

async function updatePurchase(id, changes) {
  await db("purchase")
    .where({ id })
    .update(changes);
  const updated = await findById(id);
  return updated;
}

function findById(id) {
  return db("purchase")
    .where({ id })
    .first();
}

async function findAll() {
  let allPurchased = await db("purchase").select("*");
  return allPurchased;
}

async function findFilter(cust_id) {
  let result = await db("purchase")
    .where("cust_id", cust_id).first();
  return result;
}
