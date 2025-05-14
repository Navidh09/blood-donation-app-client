import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const SearchDonors = () => {
  const { bloodGroups, upazilas, districts } = useAuth();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    const district = districts.find((d) => d.name === districtName);
    if (district) {
      const filtered = upazilas.filter((u) => u.district_id === district.id);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }

    setSelectedUpazila("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setShowResults(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        params: {
          district: selectedDistrict,
          upazila: selectedUpazila,
          bloodGroup: selectedBloodGroup,
        },
      });
      setDonors(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="py-16 px-4 lg:px-20 bg-gray-50 mt-15">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Search for Blood Donors
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 max-w-5xl mx-auto bg-white p-6 rounded-xl shadow"
      >
        {/* Blood Group */}
        <select
          className="select select-bordered w-full"
          value={selectedBloodGroup}
          onChange={(e) => setSelectedBloodGroup(e.target.value)}
        >
          <option value="">Blood Groups</option>
          {bloodGroups.map((bloodGroup, idx) => (
            <option key={idx} value={bloodGroup}>
              {bloodGroup}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          className="select select-bordered w-full"
          value={selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option value="">Districts</option>
          {districts.map((district) => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          className="select select-bordered w-full"
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
        >
          <option value="">Upazilas</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button type="submit" className="btn bg-red-500 text-white w-full">
          Search
        </button>
      </form>

      {/* Results */}
      {showResults && (
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-xl font-semibold mb-4">Matching Donors:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.length > 0 ? (
              donors.map((donor) => (
                <div
                  key={donor._id}
                  className="p-4 rounded-xl bg-white shadow hover:shadow-md text-center transition"
                >
                  <img
                    src={donor.photoURL}
                    alt={donor.displayName}
                    className="w-40 mx-auto h-28 object-cover mb-2"
                  />
                  <h4 className="text-lg font-bold">{donor.displayName}</h4>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>District: {donor.district}</p>
                  <p>Upazila: {donor.upazila}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No donors found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
