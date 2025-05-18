import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import axios from "axios";

const SignUp = () => {
  const {
    bloodGroups,
    loader,
    registerUser,
    districts,
    upazilas,
    userProfile,
    setLoader,
    setUser,
  } = useAuth();
  const navigate = useNavigate();

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const filtered = upazilas.filter((u) => u.district_id === selectedId);
    setFilteredUpazilas(filtered);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.options[form.district.selectedIndex].text;
    const upazila = form.upazila.value;
    const image = form.image.files[0];

    if (password !== confirm_password) {
      return toast.error("Password Mismatch");
    }

    try {
      const imgURL = await imageUpload(image);

      const details = {
        displayName: name,
        photoURL: imgURL,
        bloodGroup,
        district,
        upazila,
        status: "active",
        role: "Donor",
        email,
      };

      const res = await registerUser(email, password);
      setUser(res.user);
      await userProfile(details.displayName, details.photoURL);

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, details);

      toast.success("Registration Successful");
      navigate("/");
      form.reset();
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 bg-gradient-to-t from-10% to-red-500 min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Vital Drops</p>
        </div>
        <form
          onSubmit={handleSignup}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-lime-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Image
              </label>
              <input
                required
                type="file"
                className="file-input w-full"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-lime-500"
              />
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block mb-2 text-sm">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                className="select select-bordered w-full"
                required
              >
                <option disabled selected>
                  Select Blood Group
                </option>
                {bloodGroups.map((group, idx) => (
                  <option key={idx} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block mb-2 text-sm">
                District
              </label>
              <select
                name="district"
                className="select select-bordered w-full"
                required
                onChange={handleDistrictChange}
              >
                <option disabled={true} selected value="">
                  Select District
                </option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="upazila" className="block mb-2 text-sm">
                Upazila
              </label>
              <select
                name="upazila"
                className="select select-bordered w-full"
                required
              >
                <option disabled selected value="">
                  Select Upazila
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="********"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-lime-500"
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                required
                placeholder="********"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-lime-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-red-500 w-full btn rounded-md py-3 text-white"
            >
              {loader ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="px-6 py-4 text-sm text-center text-red-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-red-500 text-gray-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
