require("dotenv").config();
const express = require("express");
const router = require("./routes/router");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  cors({
    origin: process.env.CLIENT, //must be changed before release
  })
);

server.use("/api", router);

server.get("/", (req, res) => {
  res.send("Pointer Backend");
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log('Server running');
});
