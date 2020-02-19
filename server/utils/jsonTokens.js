const jwt = require("jsonwebtoken");

module.exports={
    signToken
}
function signToken(user) {
  console.log("i am user",user)
    const payload = {
      id:user.id,
      merch_email: user.merch_email
    };
    const secret = process.env.JWT_SECRET || "keep me secret";
    const options = {
      expiresIn: "1h"
    };
    return jwt.sign(payload, secret, options);
  }