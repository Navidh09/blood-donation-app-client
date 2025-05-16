import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-donation-requests/user/${
            user.email
          }`,
          {
            params: {
              status: statusFilter,
            },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, [user, statusFilter]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Donation Requests</h2>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
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
            {requests.length > 0 ? (
              requests.map((req) => (
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequests;
