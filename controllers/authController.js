const bcrypt = require("bcryptjs");
const { createJWT } = require("../middlware/JWTaction");
const User = require("../models/userModel");
exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newuser = await User.create({
      email,
      password: hashPassword,
      fullName,
      phoneNumber,
      address,
    });
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    res.status(422).json(error);
  }
};
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json("Dont have this email, please register");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong password");
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };
    const userInfor = {
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };
    const token = createJWT(payload);
    res
      .status(200)
      .json({ message: "Login success", user: userInfor, token: token });
  } catch (err) {
    res.status(422).json(err);
  }
};

exports.tokenauth = async (req, res) => {
  res.status(200).json({ message: "Token is valid", authenticated: true });
};
