const authenticate = require("../../../middleware/authenticate");

//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../../../schema/merch-auth-router-model");

//Validation
const validation = require("../../../middleware/validation");
//Hash
const bcrypt = require("../../../utils/bcryptHash.js");
//Token
const jwt = require("../../../utils/jsonTokens");

//Get all users
router.get("/", (req, res) => {
  db.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

//findById ===> get a user by its ID

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});
//Register new merchant
  router.post("/register",validation.merchReg, (req, res) => {
  let merchant = req.body;
  const pass = bcrypt.hash(merchant.merch_password);
  merchant.merch_password = pass;

  db.addMerch(merchant)
    .then(data => {
      res.status(201).json({ message: "Account Created Successfully", data });
    })
    .catch(error => {
      const { merch_name, merch_email } = req.body;
      db.findByReg(merch_name, merch_email)
        .then(user => {
          if (user) {
            res.status(404).json({ message: "Merchant name or email exist" });
          } else {
            res.status(500).json({ message: "Unable to connect to server" });
          }
        })
        .catch(error => res.status(500).json(error));
    });
});

//Delete Account
router.delete("/:id",authenticate,(req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "Account Deleted Successfully", user });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

// Update Account

  router.put("/:id", validation.merchReg, authenticate,(req, res) => {

  const id = req.params.id;
  let data = req.body;
  console.log(data)
  const pass = bcrypt.hash(data.merch_password);
data.merch_password=pass;
  db.findById(id).then(user => {
    if (user) {
      
      db.update(id, data)
        .then(updated => {
          res
            .status(202)
            .json({ message: "Account updated successfully", updated });
        })
        .catch(error => {
          res.send({
            message: "Unable to update info, Merchant  or email exist"
          });
        });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

//Login
  router.post("/login", validation.merchLogin, (req, res) => {
  let {merch_email, merch_password } = req.body;

  db.findBy({ merch_email })
    .then(user => {
      console.log(user)
      if (!user) {
        res.status(401).json({ message: "Invalid Credentials." });
      } else {
        if (bcrypt.unHash(merch_email, merch_password, user.merch_password)) {
          const token = jwt.signToken(user);

          res.status(200).json({
            message: `Welcome ${user.merch_name}!`,
            token
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials." });
        }
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
