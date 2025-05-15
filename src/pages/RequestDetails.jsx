import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`)
      .then((res) => setRequest(res.data));
  }, [id, user, navigate]);

  const handleConfirmDonation = async () => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
      {
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      }
    );

    setRequest({ ...request, status: "inprogress" });
    toast.success("Status changed to Inprogress");
    setShowModal(false);
  };

  if (!request) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 mt-32  bg-gradient-to-r from-60%  to-red-400 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        Donation Request Details
      </h2>

      <p>
        <strong>Recipient:</strong> {request.recipientName}
      </p>
      <p>
        <strong>Location:</strong> {request.upazila}, {request.district}
      </p>
      <p>
        <strong>Blood Group:</strong> {request.bloodGroup}
      </p>
      <p>
        <strong>Date:</strong> {request.date}
      </p>
      <p>
        <strong>Time:</strong> {request.time}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="uppercase">{request.status}</span>
      </p>

      {request.status === "pending" && (
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-red-500 text-white mt-6 "
        >
          Donate
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex mt-20 items-center justify-center bg-gradient-to-tr from-white to-red-400 bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-red-500">
              Confirm Donation
            </h3>

            <div className="space-y-2">
              <div>
                <label className="font-medium">Donor Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-medium">Donor Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn text-red-500 border-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDonation}
                className="btn bg-red-500 text-white"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
