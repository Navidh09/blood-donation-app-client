import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests?status=pending`)
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-4 py-10 lg:px-20 bg-gradient-to-t from-red-400 to-white mt-15 min-h-screen">
      <div className="flex items-center md:flex-row md:justify-between flex-col-reverse">
        <h2 className="md:text-3xl font-bold text-red-600 mb-10">
          Pending Donation Requests
        </h2>
        <Link
          to={"/create-donation-request"}
          className="md:text-xl w-64 py-5 font-bold btn border rounded-lg text-center bg-red-500 text-white mb-4 md:mb-10"
        >
          Add Donation Requests
        </Link>
      </div>

      {!loading ? (
        <>
          {requests && requests > 0 ? (
            <p className="lg:text-4xl md:text-2xl text-center mt-20 border-4 py-5 w-3/4 mx-auto bg-white text-red-500">
              No Pending Requests available now !
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {req.recipientName}
                  </h3>
                  <p>
                    <strong>Location:</strong> {req.upazila}, {req.district}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {req.bloodGroup}
                  </p>
                  <p>
                    <strong>Date:</strong> {req.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {req.time}
                  </p>

                  <Link
                    to={`/donation-requests/${req._id}`}
                    className="btn btn-sm mt-4 bg-red-500 text-white"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-4xl mt-20 text-white">Loading...</p>
      )}
    </div>
  );
};

export default PendingRequests;
