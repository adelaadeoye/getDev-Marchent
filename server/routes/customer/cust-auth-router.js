const authenticate = require("../../middleware/authenticate");

//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../../schema/cust-auth-router-model");

//Validation
const validation = require("../../middleware/validation");
//Hash
const bcrypt = require("../../utils/bcryptHash.js");
//Token
const jwt = require("../../utils/jsonTokens");

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
//Register new customer
router.post("/register", validation.custReg, (req, res) => {
  let customer = req.body;
  const pass = bcrypt.hash(customer.cust_password);
  customer.cust_password = pass;

  db.addCust(customer)
    .then(data => {
      res.status(201).json({ message: "Account Created Successfully", data });
    })
    .catch(error => {
      const { cust_name, cust_email } = req.body;
      db.findByReg(cust_name, cust_email)
        .then(user => {
          if (user) {
            res.status(404).json({ message: "Customer name or email exist" });
          } else {
            res.status(500).json({ message: "Unable to connect to server" });
          }
        })
        .catch(error => res.status(500).json(error));
    });
});

//Delete Account
router.delete("/:id", authenticate, (req, res) => {
  const id = req.params.id;

  db.findById(id).then(user => {
    if (user) {
      if (user.id != req.token.id) {
        res.status(400).json({
          message: "You are not the authorized to delete this account"
        });
      } else {
        db.remove(id)
          .then(user => {
            if (user) {
              res
                .status(200)
                .json({ message: "Account Deleted Successfully", user });
            } else {
              res.status(404).json({ message: "Account not found" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "Unable to connect to server" });
          });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

// Update Account

router.put("/:id", validation.custReg, authenticate, (req, res) => {
  const id = req.params.id;
  let data = req.body;
  const pass = bcrypt.hash(data.cust_password);
  data.cust_password = pass;
  db.findById(id).then(user => {
    if (user) {
      if (user.id != req.token.id) {
        res.status(400).json({
          message: "You are not the authorized to update this account"
        });
      } else {
        db.update(id, data)
          .then(updated => {
            res
              .status(202)
              .json({ message: "Account updated successfully", updated });
          })
          .catch(error => {
            res.send({
              message: "Unable to update info, Customer  or email exist"
            });
          });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

//Login
router.post("/login", validation.custLogin, (req, res) => {
  let { cust_email, cust_password } = req.body;

  db.findBy({ cust_email })
    .then(user => {
      console.log(user);
      if (!user) {
        res.status(401).json({ message: "Invalid Credentials." });
      } else {
        if (bcrypt.unHash(cust_email, cust_password, user.cust_password)) {
          const token = jwt.signToken(user);

          res.status(200).json({
            message: `Welcome ${user.cust_name}!`,
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
