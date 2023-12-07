const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    });
    res
      .status(200)
      .json({ success: true, message: `${name} registered.`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the fields." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email doesn't exist. Kindly register.",
      });
    }
    
    const hashedPassword = bcrypt.hashSync('secret', 10);
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatched) {
      return res.status(401).json({ success: false, message: "Wrong password." });
    }

    const accessToken = generateAccessToken(user._id);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  login,
  register,
};
