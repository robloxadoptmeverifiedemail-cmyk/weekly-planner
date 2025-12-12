const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "data.json");

// Load data
app.get("/data", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json({});
  const data = fs.readFileSync(DATA_FILE, "utf8");
  res.json(JSON.parse(data || "{}"));
});

// Save data
app.post("/data", (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  console.log("Data saved:", req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
