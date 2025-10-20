import express from "express";
import { createUSDDetails, deleteUSDDetails, getUSDDetails, updateUSDDetails } from "../controllers/usdController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected routes (optional: remove protect if not needed)
router.post("/", protect, createUSDDetails);
router.get("/", protect, getUSDDetails);
router.put("/:id", protect, updateUSDDetails);
router.delete("/:id", protect, deleteUSDDetails);

export default router;
