import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const { bloodGroups, districts, upazilas, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    date: "",
    time: "",
    notes: "",
  });

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const filtered = upazilas.filter((u) => u.district_id === selectedId);

    setFilteredUpazilas(filtered);
    setFormData((prev) => ({
      ...prev,
      district: selectedId,
      upazila: "",
      email: user?.email,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDistrict = districts.find((d) => d.id === formData.district);
    const selectedUpazila = upazilas.find(
      (u) => u.district_id === formData.district && u.name === formData.upazila
    );

    const newRequest = {
      ...formData,
      district: selectedDistrict?.name,
      upazila: selectedUpazila?.name,
      createdAt: new Date().toISOString(),
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
    <div className="max-w-3xl mx-auto px-4 py-10">
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
          value={formData.recipientName}
          onChange={handleChange}
        />

        <select
          name="bloodGroup"
          required
          className="select select-bordered w-full"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Blood Group
          </option>
          {bloodGroups.map((bg, idx) => (
            <option key={idx} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="district"
          className="select select-bordered w-full"
          required
          value={formData.district}
          onChange={handleDistrictChange}
        >
          <option value="" disabled>
            Select District
          </option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          className="select select-bordered w-full"
          required
          value={formData.upazila}
          onChange={handleChange}
          disabled={!formData.district}
        >
          <option value="" disabled>
            Select Upazila
          </option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          required
          className="input input-bordered w-full"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          required
          className="input input-bordered w-full"
          value={formData.time}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Additional Notes (optional)"
          className="textarea textarea-bordered w-full"
          value={formData.notes}
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
