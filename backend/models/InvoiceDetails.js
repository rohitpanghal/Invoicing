import mongoose from "mongoose";

const InvoiceDetailsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  supplierName: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  creditNotes: { type: String},
  status: {
    type: String,
    enum: ["Partial Payment", "Full Payment", "Completed"],
    default: "Partial Payment",
  },
  referenceNumber: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("InvoiceDetails", InvoiceDetailsSchema);
