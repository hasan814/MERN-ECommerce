import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// =============== Sign Up ===============
export const signup = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (name.length < 6)
      return res
        .status(400)
        .json({ message: "Name must be as least 6 Characters long" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 Characters long" });

    const [existingUser, existingName] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ name }),
    ]);

    if (existingUser)
      return res.status(400).json({ message: "Email already Register" });
    if (existingName)
      return res.status(400).json({ message: "Name already Token" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      profilePic,
      password: hashedPassword,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered Successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error, Please try again!" });
  }
};

// =============== Sign In ===============
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are required!" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not Found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or Password" });

    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const { password: pass, ...rest } = user._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Sign In Successfully", data: rest });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error, Please try again Later" });
  }
};

// =============== Sign Out ===============
export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Signing Out", error: error.message });
  }
};
