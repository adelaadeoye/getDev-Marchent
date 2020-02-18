const db = require("../database/dbConfig.js");

module.exports = {
  addUser,
  remove,
  update,
  findAll,
  findBy,
  findById,
  findByReg
};

async function addUser(usersInfo) {
  const [id] = await db("users").insert(usersInfo, "id");
  return findById(id);
}

async function remove(id) {
  const removed = await findById(id);

  await db("users")
    .where({ id })
    .del();

  return removed;
}

async function update(id, changes) {
  await db("users")
    .where({ id })
    .update(changes);

  const updated = await findById(id);
  console.log(updated);
  return updated;
}

async function findAll() {
  let allUsers = await db("users").select("id", "username", "email");
  return allUsers;
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
async function findByReg(username,email) {
  console.log(username,email)
  let result = await db("users").where('username',username).orWhere('email',email).first();
  console.log("expect",result)
  return result? true:false
}

async function findBy(username) {
  let result = await db("users").where(username).first();
  console.log(result)
  return result;
}

