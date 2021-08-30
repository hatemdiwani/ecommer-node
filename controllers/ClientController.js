const Client = require("../models/Client");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  createclient: async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(500).json({ message: "Please enter all fields" });
    }

    try {
      const user = await User.findOne({ email :email });
      if (user) return res.status(500).json({ message: "user with this email is already exist" });

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error("Something went wrong hashing the password");

      const newUser = new Client({
        name,
        email,
        password: hash,
      });

      const savedUser = await newUser.save();
      if (!savedUser) return res.status(500).json({ message: "error saving the client" });

      res.status(200).json({
        message: "user successfuly registred",
        user: savedUser,
      });
    } catch (e) {
      res.status(400).json({ message : "error registration failed" });
    }
  },
};
