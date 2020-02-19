const db = require("../database/dbConfig.js");

module.exports = {
  addMerch,
  remove,
  update,
  findById,
  findAll,
  findBy,
  findByReg
};

async function addMerch(merchInfo) {
  const [id] = await db("merchant").insert(merchInfo, "id");
  return findById(id);
}

async function remove(id) {
  const removed = await findById(id);

  await db("merchant")
    .where({ id })
    .del();

  return removed;
}

async function update(id, changes) {
  await db("merchant")
    .where({ id })
    .update(changes);

  const updated = await findById(id);
  return updated;
}

function findById(id) {
  return db("merchant")
    .where({ id })
    .first();
}
async function findAll() {
  let allMerchants = await db("merchant").select("*");
  return allMerchants;
}

async function findByReg(merch_name,merch_email) {
  let result = await db("merchant").where('merch_name',merch_name).orWhere('merch_email',merch_email).first();
  return result? true:false
}

async function findBy(data) {
  let result = await db("merchant").where(data).first();
  console.log(result)
  return result;
}

