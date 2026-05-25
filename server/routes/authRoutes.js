const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.send("WORKING 🔥");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;