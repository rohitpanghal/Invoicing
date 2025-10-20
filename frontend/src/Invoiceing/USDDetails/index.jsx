import React, { useState, useEffect } from "react";
import {
  createUSD,
  updateUSD,
  deleteUSD,
  getUSDList,
} from "../../services/usdService";
import SideNavbarWrapper from "@/components/common/SideNavbarWrapper";

const USDDetails = () => {
  const [form, setForm] = useState({
    date: "",
    referenceNumber: "",
    bookPrice: "",
    exchangeRate: "",
  });
  const [usdList, setUsdList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all USD details
  const fetchUSDList = async () => {
    try {
      const res = await getUSDList();
      setUsdList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUSDList();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ date: "", referenceNumber: "", bookPrice: "", exchangeRate: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUSD(editingId, form);
      } else {
        await createUSD(form);
      }
      resetForm();
      setIsModalOpen(false);
      fetchUSDList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (usd) => {
    setForm({
      date: usd.date.split("T")[0],
      referenceNumber: usd.referenceNumber,
      bookPrice: usd.bookPrice,
      exchangeRate: usd.exchangeRate,
    });
    setEditingId(usd._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUSD(id);
      fetchUSDList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
        <SideNavbarWrapper>
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">USD Details</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          + Add USD Detail
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Reference #</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Book Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Exchange Rate</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usdList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No records found.
                </td>
              </tr>
            ) : (
              usdList.map((usd) => (
                <tr key={usd._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-sm">{usd.date.split("T")[0]}</td>
                  <td className="px-4 py-2 text-sm">{usd.referenceNumber}</td>
                  <td className="px-4 py-2 text-sm">{usd.bookPrice}</td>
                  <td className="px-4 py-2 text-sm">{usd.exchangeRate}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(usd)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(usd._id)}
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
              {editingId ? "Update USD Detail" : "Add USD Detail"}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Number
                </label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={form.referenceNumber}
                  onChange={handleChange}
                  placeholder="e.g. REF-20251020-001"
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="bookPrice"
                  value={form.bookPrice}
                  onChange={handleChange}
                  placeholder="e.g. 150.25"
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exchange Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="exchangeRate"
                  value={form.exchangeRate}
                  onChange={handleChange}
                  placeholder="e.g. 83.45"
                  className="w-full border rounded-lg bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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

export default USDDetails;
