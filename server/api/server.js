//Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Self declared exports
const authenticate = require("../middleware/authenticate.js");
const merchAuthRouter = require("../routes/merchant/auth/merch-auth-router.js");
const custAuthRouter = require("../routes/customer/cust-auth-router");
const productRouter = require("../routes/products/product-router");
const cartRouter = require("../routes/cart/cart-router");

//Declaration
const server = express();

//This order is important
server.use(helmet()); // Help hide header sensitive details
server.use(cors()); // Help in securing request from different origin most especially from front end to backend over https request
server.use(express.json()); // Node frame work to give back json format as promise

//Route to different endpoints
server.use("/api/merchAuth", merchAuthRouter);
server.use("/api/custAuth", custAuthRouter);
server.use("/api/products", authenticate, productRouter); 
server.use("/api/cart", authenticate, cartRouter); 

server.get('/', (req,res)=>{
    res.send(`<h1>"Hello You!, Checkout out the readMe on how to access different endpoints Cheers"</h1>`)
})
module.exports = server;
