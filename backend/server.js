import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/medicines", medicineRoutes);
app.use("/api/suppliers", supplierRoutes);

const allowedUsers = [
  { username: "Dinesh", password: "Dinesh@123" },
  { username: "user2", password: "pass2" },
  { username: "user3", password: "pass3" },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = allowedUsers.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
