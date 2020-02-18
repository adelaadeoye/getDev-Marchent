//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../schema/listings-router-model");

//Validation
const validation = require("../middleware/validation");

//Get all listings
router.get("/", (req, res) => {
  db.findAllListing()
    .then(listings => {
      res.status(200).json(listings);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

//Get  listings added by user
router.get("/:id", (req, res) => { 
  const id= req.params.id;
  db.findByUser(id)
    .then(listings => {
      res.status(200).json(listings);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});


//Add new listings
router.post("/:id", validation.validateListingEntry, (req, res) => {
  let list = req.body;
  const user_id = req.params.id;
  const listings = {
    ...list,
    user_id
  };
  console.log(listings);
  db.addListing(listings)
    .then(data => {
      res.status(201).json({ message: "Listing added successfully", data });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: "Failed to add listing Possible reason user not found"
        });
    });
});

// Update Account

router.put("/:id", validation.validateListingEntry, (req, res) => {
  const id = req.params.id;
  let data = req.body;
 
  db.findById(id).then(listing => {
    if (listing) {
      db.updateListing(id, data)
        .then(updated => {
          res
            .status(202)
            .json({ message: "Listing updated successfully", updated });
        })
        .catch(error => {
          res.send({
            message: "Unable to update info Listing does not exist"
          });
        });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});
//Delete Listings
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.removeListing(id)
    .then(listing => {
      if (listing) {
        res
          .status(200)
          .json({ message: "Listing Deleted Successfully", listing });
      } else {
        res.status(404).json({ message: "Listing not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

module.exports = router;
