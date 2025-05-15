import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
        .then((res) => {
          setProfileData(res.data);
          setFormState(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        formState
      );
      setProfileData(formState);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Profile</h2>
        {!editMode ? (
          <button className="btn btn-outline" onClick={() => setEditMode(true)}>
            Edit
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formState.displayName}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formState.district}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Upazila</label>
          <input
            type="text"
            name="upazila"
            value={formState.upazila}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formState.bloodGroup}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Avatar URL</label>
          <input
            type="text"
            name="image"
            value={formState.image}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
