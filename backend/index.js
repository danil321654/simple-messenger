const express = require("express");
const db = require("./config/db");
const routes = require("./routes/index");
const passport = require("passport");
const passportConfig = require("./config/passport-config");
const cors = require("cors");

passportConfig(passport);
passport.initialize();
const app = express();

app.use(express.json());

app.use(routes);

app.use(cors());

app.get("/", (req, res) => {
  res.send("//");
});

app.listen(3003);
