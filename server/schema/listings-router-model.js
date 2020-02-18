const db = require("../database/dbConfig.js");

module.exports = {
  addListing,
  removeListing,
  updateListing,
  findAllListing,
  findById,
  findByUser
  //   findByReg
};
async function findAllListing() {
  let listings = await db("listings");
  return listings;
}

async function addListing(listingDetails) {
  const [id] = await db("listings").insert(listingDetails, "id");
  return findById(id);
}

function findById(id) {
  return db("listings")
    .where({ id })
    .first();
}

function findByUser(id) {
  return db("listings")
    .where("user_id", "=", id);
    
}

async function removeListing(id) {
  const removed = await findById(id);

  await db("listings")
    .where({ id })
    .del();

  return removed;
}

async function updateListing(id, changes) {
  await db("listings")
    .where({ id })
    .update(changes);

  const updated = await findById(id);
  return updated;
}
