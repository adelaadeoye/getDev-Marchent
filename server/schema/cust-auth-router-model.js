const db = require("../database/dbConfig.js");

module.exports = {
  addCust,
  remove,
  update,
  findById,
  findAll,
  findBy,
  findByReg
};

async function addCust(custInfo) {
  const [id] = await db("customer").insert(custInfo, "id");
  return findById(id);
}

async function remove(id) {
  const removed = await findById(id);

  await db("customer")
    .where({ id })
    .del();

  return removed;
}

async function update(id, changes) {
  await db("customer")
    .where({ id })
    .update(changes);

  const updated = await findById(id);
  console.log(updated);
  return updated;
}

function findById(id) {
  return db("customer")
    .where({ id })
    .first();
}
async function findAll() {
  let allCustomers = await db("customer").select("*");
  return allCustomers;
}

async function findByReg(cust_name,cust_email) {
  let result = await db("customer").where('cust_name',cust_name).orWhere('cust_email',cust_email).first();
  return result? true:false
}

async function findBy(data) {
  let result = await db("customer").where(data).first();
  console.log(result)
  return result;
}

