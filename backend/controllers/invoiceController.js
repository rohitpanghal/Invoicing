import InvoiceDetails from "../models/InvoiceDetails.js";
import USDDetails from "../models/USDDetails.js"; // import your USDDetails model

// Create Invoice and deduct from USDDetails
export const createInvoice = async (req, res) => {
  try {
    const { referenceNumber, totalAmount } = req.body;

    // Find USDDetails by referenceNumber
    const usd = await USDDetails.findOne({ referenceNumber });
    if (!usd) {
      return res.status(404).json({ message: "USD Detail not found for this reference number" });
    }

    // Deduct totalAmount from bookPrice
    usd.bookPrice = parseFloat(usd.bookPrice) - parseFloat(totalAmount);
    await usd.save();

    // Create invoice
    const invoice = await InvoiceDetails.create(req.body);

    res.status(201).json({ message: "Invoice created successfully", data: invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Invoice and adjust USDDetails
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { referenceNumber, totalAmount } = req.body;

    const invoice = await InvoiceDetails.findById(id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    // 1️⃣ Revert old USDDetails deduction
    if (invoice.referenceNumber) {
      const oldUSD = await USDDetails.findOne({ referenceNumber: invoice.referenceNumber });
      if (oldUSD) {
        oldUSD.bookPrice = parseFloat(oldUSD.bookPrice) + parseFloat(invoice.totalAmount);
        await oldUSD.save();
      }
    }

    // 2️⃣ Deduct from new USDDetails
    const newUSD = await USDDetails.findOne({ referenceNumber });
    if (!newUSD) return res.status(404).json({ message: "USD Detail not found for this reference number" });

    newUSD.bookPrice = parseFloat(newUSD.bookPrice) - parseFloat(totalAmount);
    await newUSD.save();

    // 3️⃣ Update invoice
    const updatedInvoice = await InvoiceDetails.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: "Invoice updated successfully", data: updatedInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Invoice and revert USDDetails
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceDetails.findById(id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    // Revert USDDetails.bookPrice
    const usd = await USDDetails.findOne({ referenceNumber: invoice.referenceNumber });
    if (usd) {
      usd.bookPrice = parseFloat(usd.bookPrice) + parseFloat(invoice.totalAmount);
      await usd.save();
    }

    await invoice.deleteOne();
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All
export const getInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceDetails.find();
    res.status(200).json({ data: invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read One
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await InvoiceDetails.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json({ data: invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
