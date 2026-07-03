import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ownerMenu from "../utils/ownerMenu";

import {
  getOwnerRequests,
  updateInterestStatus,
} from "../services/interestService";

const OwnerRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await getOwnerRequests();

      if (res.data.success) {
        setRequests(res.data.requests || []);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateInterestStatus(id, status);

      toast.success(`Request ${status}`);

      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Operation Failed");
    }
  };

  const openChat = (item) => {
    navigate(`/chat/${item.tenant._id}/${item.listing._id}`);
  };

  return (
    <DashboardLayout menu={ownerMenu}>
      <h1 className="text-4xl font-bold mb-8">
        Interest Requests
      </h1>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          Loading...
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No requests found
          </h2>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {item.tenant?.fullName}
                </h2>

                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    item.status === "accepted"
                      ? "bg-green-600"
                      : item.status === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> {item.tenant?.email}
                </p>

                <p>
                  <strong>Listing:</strong> {item.listing?.title}
                </p>

                <p>
                  <strong>Location:</strong> {item.listing?.location}
                </p>

                <p>
                  <strong>Rent:</strong> ₹{item.listing?.rent}
                </p>

                <p>
                  <strong>Message:</strong>
                </p>

                <div className="bg-gray-100 rounded-lg p-4">
                  {item.message}
                </div>
              </div>

              {/* Pending */}
              {item.status === "pending" && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() =>
                      handleStatus(item._id, "accepted")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleStatus(item._id, "rejected")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* Accepted */}
              {item.status === "accepted" && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => openChat(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Open Chat
                  </button>
                </div>
              )}

              {/* Rejected */}
              {item.status === "rejected" && (
                <div className="mt-6 text-red-600 font-semibold">
                  Request Rejected
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default OwnerRequests;