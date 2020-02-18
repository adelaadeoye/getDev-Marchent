//TODO intended to bring all validation together
module.exports = {
  validateInput,
  validateRegEntry,
  validateListingEntry,
};
function validateInput(req, res, next) {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ message: "Username or Password cannot be empty" });
  } else {
    next();
  }
}

function validateRegEntry(req, res, next) {
    let { username, password,email } = req.body;
    if (!username || !password ||!email) {
      res.status(404).json({ message: "Username or Password or email cannot be empty" });
    } else {
      next();
    }
  }

  function validateListingEntry(req, res, next) {
    let {bath_num, bed_num,zip,address,city,street,price,sq_ft,email} = req.body;
    let id=req.params.id
    if (!bath_num || !bed_num ||!zip||!address||!city||!street||!price||!sq_ft||!email||!id) {
      res.status(404).json({ message: "All entries are required" });
    } else {
      next();
    }
  }