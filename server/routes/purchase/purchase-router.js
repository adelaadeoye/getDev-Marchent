//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../../schema/purchase-router-model");

//Validation
const validation = require("../../middleware/validation");

//TODO this should not be made available
// router.get("/", (req, res) => {
//   db.findAll()
//     .then(products => {
//       res.status(200).json(products);
//     })
//     .catch(error => {
//       res.status(500).json({ message: "Unable to connect to server" });
//     });
// });

//endpoint for purchase by customer
router.get("/:id", (req, res) => {
    const cust_id=req.params.id;
    if (cust_id !=req.token.id){
        res.status(400).json({message:"You can't view someone else account"})

    }
    else{
        db.findFilter(cust_id)
        .then(purchased => {
          res.status(200).json(purchased);
        })
        .catch(error => {
          res.status(500).json({ message: "Unable to connect to server" });
        });
    }
    
  });

  router.get("/:id", (req, res) => {
    const cust_id=req.params.id;
    if (cust_id !=req.token.id){
        res.status(400).json({message:"You can't view someone else account"})

    }
    else{
        db.findFilter(cust_id)
        .then(purchased => {
          res.status(200).json(purchased);
        })
        .catch(error => {
          res.status(500).json({ message: "Unable to connect to server" });
        });
    }
    
  });
//add product to purchase
router.post("/:id", (req, res) => {
  let purch = req.body;
  const cust_id = req.params.id;
  const purchased = {
    ...purch,
    cust_id
  };
  if (cust_id != req.token.id) {
    res.status(400).json({ message: "You can't add to someone else account" });
  } else {
    db.addPurchase(purchased)
      .then(data => {
        res
          .status(201)
          .json({ message: "Payment received ", data });
      })
      .catch(error => {
        res.status(500).json({
          message:
            "Failed to add Product to purchase, Possible reason user not found"
        });
      });
  }
});

//TODO will look at what to do with update and delete as i think it is not advisable 
//update cart
// router.put("/:id", validation.productAdd_Update, (req, res) => {
// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   let data = req.body;

//   db.findById(id).then(product => {
//     if (product) {
//       if (product.cust_id != req.token.id) {
//         res
//           .status(400)
//           .json({ message: "You can't update someone else product" });
//       } else {
//         db.updateCart(id, data)
//           .then(updated => {
//             res
//               .status(202)
//               .json({ message: "Cart updated successfully", updated });
//           })
//           .catch(error => {
//             res.send({
//               message: "Unable to update Cart, product does not exist in cart"
//             });
//           });
//       }
//     } else {
//       res.status(404).json({ message: "Not found" });
//     }
//   });
// });
// //Delete product from Cart 
// router.delete("/:id", (req, res) => {
//     const id = req.params.id;
  
//     db.findById(id).then(product => {
//       if (product) {
//         if(product.cust_id != req.token.id){
//           res.status(400).json({message:"You can't delete from someone else cart"})
  
//         }
//         else{
//           db.deleteCart(id)
//           .then(product => {
//             if (product) {
//               res
//                 .status(200)
//                 .json({ message: "Product Deleted Successfully from cart", product });
//             } else {
//               res.status(404).json({ message: "Product not found" });
//             }
//           })
//           .catch(error => {
//             res.status(500).json({ message: "Unable to connect to server" });
//           });
//         }
//       } else {
//         res.status(404).json({ message: "Product not found" });
//       }})
    
    
//   });

module.exports = router;
