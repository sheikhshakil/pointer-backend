const admin = require("firebase-admin");
const key = require("./SAK.json");

admin.initializeApp({
  credential: admin.credential.cert(key),
});

module.exports = admin
