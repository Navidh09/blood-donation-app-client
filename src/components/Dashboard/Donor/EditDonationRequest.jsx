import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    date: "",
    time: "",
    bloodGroup: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          recipientName: data.recipientName || "",
          district: data.district || "",
          upazila: data.upazila || "",
          date: data.date || "",
          time: data.time || "",
          bloodGroup: data.bloodGroup || "",
        });
      })
      .catch((err) => {
        console.error("Error loading request:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/edit-donation-requests/${id}`,
        formData
      );
      Swal.fire("Updated!", "Donation request updated.", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="District"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          placeholder="Upazila"
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
