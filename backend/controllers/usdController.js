import USDDetails from "../models/USDDetails.js";

// ✅ Create new USD details
export const createUSDDetails = async (req, res) => {
  try {
    const { date, referenceNumber, bookPrice, exchangeRate } = req.body;

    // Check for existing reference number
    const exists = await USDDetails.findOne({ referenceNumber });
    if (exists) {
      return res.status(400).json({ message: "Reference number already exists" });
    }

    const usd = await USDDetails.create({
      date,
      referenceNumber,
      bookPrice,
      exchangeRate
    });

    res.status(201).json({
      message: "USD details created successfully",
      data: usd
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all USD details
export const getUSDDetails = async (req, res) => {
  try {
    const usdList = await USDDetails.find().sort({ createdAt: -1 });
    res.status(200).json(usdList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUSDDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, referenceNumber, bookPrice, exchangeRate } = req.body;

    const updated = await USDDetails.findByIdAndUpdate(
      id,
      { date, referenceNumber, bookPrice, exchangeRate },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "USD details not found" });
    }

    res.status(200).json({
      message: "USD details updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUSDDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete using filter
    const result = await USDDetails.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "USD details not found" });
    }

    res.status(200).json({
      message: "USD details deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
