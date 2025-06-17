import jwt from "jsonwebtoken";

// Read the private key
const payload = {
  role: "admin",
  username: "Admin",
};

const token = jwt.sign(payload, "mp40max123");

console.log("Generated Token:", token);
