import jwt from "jsonwebtoken";
import fs from "fs";

// Read the private key
const privateKey = fs.readFileSync("private.key", "utf8");

const payload = {
  role: "admin",
  username: "Admin",
};

const token = jwt.sign(payload, privateKey, {
  algorithm: "ES256",
  expiresIn: "30d", // Use a more reasonable expiration time
});

console.log("Generated Token:", token);
