//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../../schema/ordered-router-model");

//Validation
const validation = require("../../middleware/validation");

//TODO this should not be made available
// router.get("/", (req, res) => {
//   db.findAll()
//     .then(ordered => {
//       res.status(200).json(ordered);
//     })
//     .catch(error => {
//       res.status(500).json({ message: "Unable to connect to server" });
//     });
// });

//endpoint for ordered from a store/merchant
router.get("/:id", (req, res) => {
    const merch_id=req.params.id;
    if (merch_id !=req.token.id){
        res.status(400).json({message:"You can't view someone else account"})

    }
    else{
        db.findFilter(merch_id)
        .then(ordered => {
          res.status(200).json(ordered);
        })
        .catch(error => {
          res.status(500).json({ message: "Unable to connect to server" });
        });
    }
    
  });

  
//add product to order
router.post("/:id", (req, res) => {
  let order = req.body;
  const merch_id = req.params.id;
  const ordered = {
    ...order,
    merch_id
  };
  if (merch_id != req.token.id) {
    res.status(400).json({ message: "You can't add to someone else account" });
  } else {
    db.addOrder(ordered)
      .then(data => {
        res
          .status(201)
          .json({ message: "Order complete ", data });
      })
      .catch(error => {
        res.status(500).json({
          message:
            "Failed to Make order, Possible reason user not found"
        });
      });
  }
});

//TODO will look at what to do with update and delete as i think it is not advisable 
//update order
// router.put("/:id", validation.productAdd_Update, (req, res) => {
// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   let data = req.body;

//   db.findById(id).then(product => {
//     if (product) {
//       if (product.merch_id != req.token.id) {
//         res
//           .status(400)
//           .json({ message: "You can't update someone else order's account" });
//       } else {
//         db.updateOrder(id, data)
//           .then(updated => {
//             res
//               .status(202)
//               .json({ message: "Order updated successfully", updated });
//           })
//           .catch(error => {
//             res.send({
//               message: "Unable to update Order, product does not exist in cart"
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
//         if(product.merch_id != req.token.id){
//           res.status(400).json({message:"You can't delete from someone else Order's account"})
  
//         }
//         else{
//           db.deleteOrder(id)
//           .then(product => {
//             if (product) {
//               res
//                 .status(200)
//                 .json({ message: "Order Deleted Successfully from cart", product });
//             } else {
//               res.status(404).json({ message: "Order not found" });
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
