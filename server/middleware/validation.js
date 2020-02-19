//TODO intended to bring all validation together
module.exports = {
  merchLogin,
  merchReg,
  validateListingEntry,
};
function merchLogin(req, res, next) {
  let { merch_email, merch_password } = req.body;
  if (!merch_email || !merch_password) {
    res.status(404).json({ message: "Email or Password cannot be empty" });
  } else {
    next();
  }
}

function merchReg(req, res, next) {
    let { merch_name,merch_store_name,merch_email, merch_password, } = req.body;
    if (!merch_name || !merch_store_name ||!merch_email|| !merch_password) {
      res.status(404).json({ message: "All entries are required" });
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