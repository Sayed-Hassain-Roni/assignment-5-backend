const crypto = require("crypto");

// Generate a 32-byte long random key (you can adjust the length)
const secretKey = crypto.randomBytes(16).toString("hex");

console.log("Generated JWT Secret Key:", secretKey);
