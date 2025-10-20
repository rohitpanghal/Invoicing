import mongoose from "mongoose";

const usdDetailsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    referenceNumber: { type: String, required: true, unique: true },
    bookPrice: { type: Number, required: true },
    exchangeRate: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("USDDetails", usdDetailsSchema);
