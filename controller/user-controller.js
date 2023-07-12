const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Error fetching users, please try again" });
  }
  if (users) {
    return res.status(201).json(users);
  }
  return res.status(404).json({ message: "No users found" });
};
const createUser = async (req, res) => {
  const { username, password , admin} = req.body;
  let user;
  try {
    user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(404).json({ message: "Username already exists" });
  }
  if (!user) {
    try {
      user = new User({
        username,
        password: await bcrypt.hash(password, 12),
        admin
      });
      user.save();
    } catch (err) {
      return res.status(404).json({ message: "Could not create this user" });
    }
    return res.status(201).json(user);
  }
  return res.status(404).json({ message: "Username already exists" });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let user;
  try {
    user = await User.findOne({ username: username });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "cannot login , please try again " });
  }
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials " });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "cannot crypt the password" });
  }
  let token;
  try {
    token = jwt.sign({ username: user.username }, "app_token", {
      expiresIn: "2h",
    });
  } catch (err) {
    console.log(err);
  }
  res
    .status(201)
    .json({ username: user.username, token: token, admin: user.admin });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  let user;
  try {
    user = await User.findOneAndDelete({ username: id });
  } catch (err) {
    res
    .status(401)
    .json({ message:"error cannot delete this user" });
  }
  if (user) {
    console.log(user.username)
    return res.status(201).json({message:"user have been deleted"})
  }
  return res
    .status(401)
    .json({ message:"error cannot delete this user" });
};
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;
exports.deleteUser = deleteUser;
