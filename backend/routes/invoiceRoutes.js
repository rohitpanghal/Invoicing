import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);            // Create
router.get("/", getInvoices);              // Get all
router.get("/:id", getInvoiceById);        // Get one
router.put("/:id", updateInvoice);         // Update
router.delete("/:id", deleteInvoice);      // Delete

export default router;
