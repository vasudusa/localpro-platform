
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const tenantMiddleware = require("./middleware/tenant");

const app = express();

app.use(cors());
app.use(express.json());
app.use(tenantMiddleware);

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/vendor", require("./routes/vendor"));
app.use("/api/superadmin", require("./routes/superadmin"));
app.use("/api/health", require("./routes/health"));

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));
// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
