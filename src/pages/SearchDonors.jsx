import { useEffect } from "react";
import { useState } from "react";

const SearchDonors = () => {
  const [showResults, setShowResults] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    fetch("upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
    // Add logic to fetch donor data based on form input
  };

  return (
    <div className="py-16 px-4 lg:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Search for Blood Donors
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 max-w-5xl mx-auto bg-white p-6 rounded-xl shadow"
      >
        {/* Blood Group */}
        <select className="select select-bordered w-full" required>
          <option disabled selected>
            Blood Group
          </option>
          {bloodGroups.map((bloodGroup, idx) => (
            <option key={idx}>{bloodGroup}</option>
          ))}
        </select>

        {/* District */}
        <select className="select select-bordered w-full" required>
          <option disabled selected>
            District
          </option>
          {districts.map((district) => (
            <option key={district.id}>{district.name}</option>
          ))}
        </select>

        {/* Upazila */}
        <select className="select select-bordered w-full" required>
          <option disabled selected>
            Upazila
          </option>
          {upazilas.map((upazila) => (
            <option key={upazila.id}>{upazila.name}</option>
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
            {/* Mock Donor Cards */}
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="p-4 rounded-xl bg-white shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-bold">John Doe</h4>
                <p>Blood Group: A+</p>
                <p>District: Dhaka</p>
                <p>Upazila: Mohammadpur</p>
                <button className="mt-2 btn btn-sm btn-outline">Contact</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
