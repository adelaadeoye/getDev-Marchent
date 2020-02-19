//TODO intended to bring all validation together
module.exports = {
  merchLogin,
  merchReg,
  custReg,
  custLogin,
  productAdd_Update,
};
function merchLogin(req, res, next) {
  let { merch_email, merch_password } = req.body;
  if (!merch_email || !merch_password) {
    res.status(404).json({ message: "Email or Password cannot be empty" });
  } else {
    next();
  }
}
function custLogin(req, res, next) {
  let { cust_email, cust_password } = req.body;
  if (!cust_email || !cust_password) {
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
  function custReg(req, res, next) {
    let { cust_name,cust_email, cust_password, } = req.body;
    if (!cust_name || !cust_email|| !cust_password) {
      res.status(404).json({ message: "All entries are required" });
    } else {
      next();
    }
  }
  function productAdd_Update(req, res, next) {
    let {prod_name, prod_type,prod_image_url,prod_price} = req.body;
    let id=req.params.id
    if (!prod_name || !prod_type ||!prod_image_url||!prod_price) {
      res.status(404).json({ message: "All entries are required" });
    } else {
      next();
    }
  }