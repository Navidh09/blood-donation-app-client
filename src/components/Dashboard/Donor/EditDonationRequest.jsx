import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const EditDonationRequest = () => {
  const { bloodGroups, districts, upazilas } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    date: "",
    time: "",
    bloodGroup: "",
    status: "",
  });

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`)
      .then((res) => {
        const data = res.data;

        const relatedDistrict = districts.find((d) => d.name === data.district);
        const relatedUpazilas = upazilas.filter(
          (u) => u.district_id === (relatedDistrict?.id || "")
        );

        setFormData({
          recipientName: data.recipientName || "",
          district: data.district || "",
          upazila: data.upazila || "",
          date: data.date || "",
          time: data.time || "",
          bloodGroup: data.bloodGroup || "",
          status: data.status || "pending",
        });

        setFilteredUpazilas(relatedUpazilas);
      })
      .catch((err) => {
        console.error("Error loading request:", err);
      });
  }, [id, districts, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "district") {
      const selectedDistrict = districts.find((d) => d.id === value);
      const newDistrictName = selectedDistrict?.name || "";
      const filtered = upazilas.filter((u) => u.district_id === value);

      setFormData((prev) => ({
        ...prev,
        district: newDistrictName,
        upazila: "",
      }));
      setFilteredUpazilas(filtered);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      <h2 className="text-2xl font-bold text-center mb-10 text-red-500">
        Edit Donation Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-red-400">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-red-400">
            District
          </label>
          <select
            name="district"
            onChange={handleChange}
            className="select select-bordered w-full"
            required
            value={
              districts.find((d) => d.name === formData.district)?.id || ""
            }
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-red-400">
            Upazila
          </label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-red-400">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-red-400">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-red-400">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg, idx) => (
              <option key={idx} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn bg-red-500 text-white w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
