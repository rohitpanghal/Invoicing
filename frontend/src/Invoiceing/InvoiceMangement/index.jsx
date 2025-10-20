import React, { useState, useEffect } from "react";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoices,
} from "../../services/invoiceService"; // Make sure to create this service
import _ from "lodash"
import SideNavbarWrapper from "@/components/common/SideNavbarWrapper";

const InvoiceMangement = () => {
  const [form, setForm] = useState({
    referenceNumber:"",
    date: "",
    invoiceNumber: "",
    supplierName: "",
    invoiceDate: "",
    totalAmount: "",
    creditNotes: "",
    status: "Partial Payment",
  });
  const [invoiceList, setInvoiceList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch invoices
  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoiceList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      date: "",
      invoiceNumber: "",
      supplierName: "",
      invoiceDate: "",
      totalAmount: "",
      creditNotes: "",
      status: "Partial Payment",
      referenceNumber:""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateInvoice(editingId, form);
      } else {
        await createInvoice(form);
      }
      resetForm();
      setIsModalOpen(false);
      fetchInvoices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (invoice) => {
    setForm({
      date: invoice.date.split("T")[0],
      invoiceNumber: invoice.invoiceNumber,
      supplierName: invoice.supplierName,
      invoiceDate: invoice.invoiceDate.split("T")[0],
      totalAmount: invoice.totalAmount,
      creditNotes: invoice.creditNotes,
      status: invoice.status,
      referenceNumber: invoice.referenceNumber
    });
    setEditingId(invoice._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      fetchInvoices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SideNavbarWrapper>
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Invoice Details</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          + Add Invoice
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Refrence #</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Invoice #</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Supplier</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Invoice Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Credit Notes</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No records found.
                </td>
              </tr>
            ) : (
              invoiceList && _.isArray(invoiceList) && invoiceList?.map((invoice) => (
                <tr key={invoice._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-sm">{invoice.date.split("T")[0]}</td>
                  <td className="px-4 py-2 text-sm">{invoice.referenceNumber}</td>
                  <td className="px-4 py-2 text-sm">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-2 text-sm">{invoice.supplierName}</td>
                  <td className="px-4 py-2 text-sm">{invoice.invoiceDate.split("T")[0]}</td>
                  <td className="px-4 py-2 text-sm">{invoice.totalAmount}</td>
                  <td className="px-4 py-2 text-sm">{invoice.creditNotes}</td>
                  <td className="px-4 py-2 text-sm">{invoice.status}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(invoice)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(invoice._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editingId ? "Update Invoice" : "Add Invoice"}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Reference Number
  </label>
  <input
    type="text"
    name="referenceNumber"
    value={form.referenceNumber || ""}
    onChange={handleChange}
    placeholder="Enter USD Reference Number"
    className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={form.invoiceNumber}
                  onChange={handleChange}
                  placeholder="e.g. INV-20251020-001"
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                <input
                  type="text"
                  name="supplierName"
                  value={form.supplierName}
                  onChange={handleChange}
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={form.invoiceDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                <input
                  type="number"
                  step="0.01"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleChange}
                  placeholder="e.g. 1500.75"
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Notes</label>
                <input
                  type="text"
                  name="creditNotes"
                  value={form.creditNotes}
                  onChange={handleChange}
                  placeholder="e.g. xyz"
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Partial Payment">Partial Payment</option>
                  <option value="Full Payment">Full Payment</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </SideNavbarWrapper>
  );
};

export default InvoiceMangement;
