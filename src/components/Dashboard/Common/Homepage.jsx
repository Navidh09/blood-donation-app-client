import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Homepage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/donation-requests/user/${user.email}`
        )
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
        { status }
      );
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, id)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been deleted.",
                icon: "success",
              });
              const remaining = requests.filter((blog) => blog._id !== id);
              setRequests(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h1>

      {requests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Recent Donation Requests
          </h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.district}, {req.upazila}
                  </td>
                  <td>{req.date}</td>
                  <td>{req.time}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.status}</td>
                  <td className="space-x-1">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/donation-requests/${req._id}`)
                      }
                      className="btn btn-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/donation-requests/edit/${req._id}`)
                      }
                      className="btn btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="btn btn-sm btn-success"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="btn btn-sm btn-warning"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => navigate("/dashboard/my-donation-requests")}
            className="mt-4 btn btn-outline btn-primary"
          >
            View My All Requests
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
