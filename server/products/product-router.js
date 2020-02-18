//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../schema/product-router-model");

//Validation
const validation = require("../middleware/validation");

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
  const id= req.params.id;
  db.findByMerchant(id)
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});


//Add new listings
// router.post("/:id", validation.validateListingEntry, (req, res) => {
  router.post("/:id",  (req, res) => {
  let prod = req.body;
  const merch_id = req.params.id;
  const products = {
    ...prod,
    merch_id
  };
  console.log(products);
  db.addProduct(products)
    .then(data => {
      res.status(201).json({ message: "Product added successfully", data });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: "Failed to add listing Possible reason user not found"
        });
    });
});

// Update product

// router.put("/:id", validation.validateListingEntry, (req, res) => {
  router.put("/:id",  (req, res) => {
  const id = req.params.id;
  let data = req.body;
 
  db.findById(id).then(product => {
    if (product) {
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
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});
//Delete product
router.delete("/:id", (req, res) => {
  const id = req.params.id;
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
});

module.exports = router;
