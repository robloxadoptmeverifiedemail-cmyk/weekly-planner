const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Parse JSON requests
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Root route fallback
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const DATA_FILE = path.join(__dirname, "data.json");

// GET data
app.get("/data", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json({});
  const data = fs.readFileSync(DATA_FILE, "utf8");
  res.json(JSON.parse(data || "{}"));
});

// POST data
app.post("/data", (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  console.log("Data saved:", req.body);
  res.json({ status: "ok" });
});

// Listen on the correct port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
