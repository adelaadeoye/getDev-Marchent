const db = require("../database/dbConfig.js");

module.exports = {
  addProduct,
  removeProduct,
  updateProduct,
  findAllProduct,
  findById,
  findByMerchant
  //   findByReg
};
async function findAllProduct() {
  let product = await db("product");
  return product;
}

async function addProduct(productDetails) {
  const [id] = await db("product").insert(productDetails, "id");
  return findById(id);
}

function findById(id) {
  return db("product")
    .where({ id })
    .first();
}

function findByMerchant(id) {
  return db("product")
    .where("merch_id", "=", id);
    
}

async function removeProduct(id) {
  const removed = await findById(id);

  await db("product")
    .where({ id })
    .del();

  return removed;
}

async function updateProduct(id, changes) {
  await db("product")
    .where({ id })
    .update(changes);

  const updated = await findById(id);
  return updated;
}
