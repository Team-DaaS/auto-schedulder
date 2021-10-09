const bcrypt = require("bcryptjs");
const { response } = require("express");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { league_name, email, password } = req.body;
    console.log(req.body);
    const existingUser = await db.Auth.check_user({ email });
    if (existingUser[0]) {
      return res.status(400).send("User with this email already exists");
    }

    let salt = bcrypt.genSaltSync(5);
    const hash = await bcrypt.hashSync(password, salt);

    const newUser = await db.Auth.register_user({
      league_name: league_name,
      email: email,
      hash: hash,
    });

    req.session.user = newUser[0];
    res.status(201).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    const existingUser = await db.auth.check_user({ email });
    console.log(existingUser);
    if (!existingUser[0]) {
      return res.status(404).send("User is not found");
    }
    console.log("line 35");
    const isAuthenticated = await bcrypt.compare(
      password,
      existingUser[0].password
    );
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      return res.status(401).send("Password does not match");
    }
    delete existingUser[0].password;
    console.log(existingUser[0]);
    req.session.user = existingUser[0];
    return res.status(202).send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
};
