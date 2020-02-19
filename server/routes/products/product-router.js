//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../../schema/product-router-model");

//Validation
const validation = require("../../middleware/validation");

//Get all products
router.get("/", (req, res) => {
  db.findAllProduct()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

//Get  product added by Merchant
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id != req.token.id) {
    res
      .status(400)
      .json({ message: "You can't view products added by other merchants" });
  } else {
    db.findByMerchant(id)
      .then(products => {
        res.status(200).json(products);
      })
      .catch(error => {
        res.status(500).json({ message: "Unable to connect to server" });
      });
  }
});

//Add new product
router.post("/:id", validation.productAdd_Update, (req, res) => {
  let prod = req.body;
  const merch_id = req.params.id;
  const products = {
    ...prod,
    merch_id
  };
  if (merch_id != req.token.id) {
    res.status(400).json({ message: "You are not the authorized store owner" });
  } else {
    db.addProduct(products)
      .then(data => {
        console.log("i am the data", req.token);
        res.status(201).json({ message: "Product added successfully", data });
      })
      .catch(error => {
        res.status(500).json({
          message: "Failed to add Product, Possible reason user not found"
        });
      });
  }
});

// Update product

router.put("/:id", validation.productAdd_Update, (req, res) => {
  const id = req.params.id;
  let data = req.body;

  db.findById(id).then(product => {
    if (product) {
      if (product.merch_id != req.token.id) {
        res
          .status(400)
          .json({ message: "You are not the authorized product owner" });
      } else {
        console.log("I am product", product);
        db.updateProduct(id, data)
          .then(updated => {
            res
              .status(202)
              .json({ message: "Product updated successfully", updated });
          })
          .catch(error => {
            res.send({
              message: "Unable to update product, product does not exist"
            });
          });
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});
//Delete product
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id).then(product => {
    if (product) {
      if (product.merch_id != req.token.id) {
        res
          .status(400)
          .json({ message: "You are not the authorized product owner" });
      } else {
        db.removeProduct(id)
          .then(product => {
            if (product) {
              res
                .status(200)
                .json({ message: "Product Deleted Successfully", product });
            } else {
              res.status(404).json({ message: "Product not found" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "Unable to connect to server" });
          });
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});

module.exports = router;
