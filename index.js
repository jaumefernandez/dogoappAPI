const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const trans = require("./routes/transaction");
const InitiateMongoServer = require("./config/db");



// const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());



// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
/**
 * Router Middleware
 * Router - /trans/*
 * Method - *
 */
 app.use("/trans", trans);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});