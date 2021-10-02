require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require("./Controller/authCtrl");
const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  CONNECTION_STRING: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    console.log("Database Connected");
    app.set("db", dbInstance),
      app.listen(SERVER_PORT, () =>
        console.log(`Server running on Port ${SERVER_PORT}`)
      );
  })
  .catch((err) => console.log(err));

app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.delete("/api/logout", authCtrl.logout);
