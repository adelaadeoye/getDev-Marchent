//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../schema/auth-router-model");

//Validation
const validation = require("../middleware/validation");
//Hash
const bcrypt = require("../utils/bcryptHash.js");
//Token
const jwt = require("../utils/jsonTokens");

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
//Register new user
router.post("/register", validation.validateRegEntry, (req, res) => {
  let user = req.body;
  const pass = bcrypt.hash(user.password);
  user.password = pass;

  db.addUser(user)
    .then(data => {
      res.status(201).json({ message: "Account Created Successfully", data });
    })
    .catch(error => {
      const { username, email } = req.body;
      db.findByReg(username, email)
        .then(user => {
          if (user) {
            res.status(404).json({ message: "Username or email exist" });
          } else {
            res.status(500).json({ message: "Unable to connect to server" });
          }
        })
        .catch(error => res.status(500).json(error));
    });
});

//Delete Account
router.delete("/:id", (req, res) => {
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

router.put("/:id",validation.validateRegEntry, (req, res) => {

  const id = req.params.id;
  let data = req.body;
  const pass = bcrypt.hash(data.password);
data.password=pass;
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
            message: "Unable to update info username or email exist"
          });
        });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

//Login
router.post("/login", validation.validateInput, (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: "Invalid Credentials." });
      } else {
        if (bcrypt.unHash(user, password, user.password)) {
          const token = jwt.signToken(user);

          res.status(200).json({
            message: `Welcome ${user.username}!`,
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
