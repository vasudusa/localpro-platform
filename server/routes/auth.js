
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (!user.rows.length)
    return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!valid)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    {
      id: user.rows[0].id,
      role: user.rows[0].role,
      tenant_id: user.rows[0].tenant_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
