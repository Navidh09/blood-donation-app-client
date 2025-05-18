import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";

const CreateDonationRequest = () => {
  const { bloodGroups, districts, upazilas, user } = useAuth();
  const navigate = useNavigate();

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const filtered = upazilas.filter((u) => u.district_id === districtId);
    setFilteredUpazilas(filtered);
    setSelectedDistrictId(districtId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const recipientName = form.recipientName.value;
    const bloodGroup = form.bloodGroup.value;
    const districtId = form.district.value;
    const upazilaName = form.upazila.value;
    const date = form.date.value;
    const time = form.time.value;
    const notes = form.notes.value;

    const selectedDistrict = districts.find((d) => d.id === districtId);
    const selectedUpazila = upazilas.find(
      (u) => u.district_id === districtId && u.name === upazilaName
    );

    const newRequest = {
      recipientName,
      bloodGroup,
      district: selectedDistrict?.name,
      upazila: selectedUpazila?.name,
      date,
      time,
      notes,
      email: user?.email,
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
      // eslint-disable-next-line no-unused-vars
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
        />

        <select
          name="bloodGroup"
          required
          className="select select-bordered w-full"
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

        <select
          name="district"
          required
          className="select select-bordered w-full"
          onChange={handleDistrictChange}
        >
          <option value="" disabled selected>
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
          required
          className="select select-bordered w-full"
          disabled={!selectedDistrictId}
        >
          <option value="" disabled selected>
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
        />

        <input
          type="time"
          name="time"
          required
          className="input input-bordered w-full"
        />

        <textarea
          name="notes"
          placeholder="Additional Notes (optional)"
          className="textarea textarea-bordered w-full"
        />

        <button type="submit" className="btn bg-red-500 text-white w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
