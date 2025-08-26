const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET =process.env.JWT_SECRET;
const axios=require("axios");
// Google login route
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body; // frontend sends access_token

    // Fetch user profile using access_token
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { name, email } = googleUser.data;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        userName: name,
        email,
        password: "google-auth",
      });
    }

    // Create JWT
    const data = { user: { id: user.id } };
    const authToken = JWT.sign(data, JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Google login failed" });
  }
});
// Create a user
router.post(
  "/createuser",
  [
    body("userName", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        userName: req.body.userName,
        password: secPass,
        email: req.body.email,
      });

      const data = { user: { id: user.id } };
      const authToken = JWT.sign(data, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

// Authenticate user login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const passwordCmp = await bcrypt.compare(password, user.password);
      if (!passwordCmp) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const data = { user: { id: user.id } };
      const authToken = JWT.sign(data, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, authToken});
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

// Get logged-in user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
