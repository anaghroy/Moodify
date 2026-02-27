const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**Cookie settings */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
};
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    /**Checking-1 Validation */
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    /**Checking-2 existing user*/
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isAlreadyRegistered) {
      return res.status(400).json({
        message: "User with the same email or username already exists",
      });
    }

    /**Hash password */
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    /**Creating JWT token */
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    /**Token save on Cookies */
    res.cookie("token", token, cookieOptions);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password, username } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Credentials required",
      });
    }

    /**Find user */
    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    /**Checking-2 User */
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    /**Checking-1 Password */
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { registerUser, loginUser };
