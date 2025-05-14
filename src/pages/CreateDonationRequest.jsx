import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const { bloodGroups } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    location: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      ...formData,
      status: "pending",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-requests`,
        newRequest
      );
      toast.success("Donation request created successfully!");
      navigate("/donation-requests");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 ">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Create Donation Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <input
          type="text"
          name="recipientName"
          required
          placeholder="Recipient Name"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        <select
          name="bloodGroup"
          required
          className="select select-bordered w-full"
          onChange={handleChange}
        >
          <option value="" disabled selected>
            Select Blood Group
          </option>
          {bloodGroups.map((bg, idx) => (
            <option key={idx} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          required
          placeholder="Location"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          required
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          required
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Additional Notes (optional)"
          className="textarea textarea-bordered w-full"
          onChange={handleChange}
        />

        <button type="submit" className="btn bg-red-500 text-white w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
