import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import usdRoutes from "./routes/usdRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import cors from "cors"

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://invoicing-2-n83z.onrender.com/",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// Example route
app.get("/", (req, res) => {
  res.send("MongoDB + Express.js connected successfully!");
});

app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "Welcome, authorized user!", user: req.user });
});

app.use("/api/auth", authRoutes);
app.use("/api/usd-details", usdRoutes);
app.use("/api/invoices", invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
