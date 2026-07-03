import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import tenantMenu from "../utils/tenantMenu";

import { getMyRequests } from "../services/interestService";

const MyRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await getMyRequests();

      setRequests(res.data.requests || []);
    } catch (err) {
      toast.error("Unable to load requests");
    } finally {
      setLoading(false);
    }
  };

  const openChat = (item) => {
    if (!item.owner?._id) {
      toast.error("Owner information not found.");
      return;
    }

    if (!item.listing?._id) {
      toast.error("Listing information not found.");
      return;
    }

    navigate(`/chat/${item.owner._id}/${item.listing._id}`);
  };

  if (loading) {
    return (
      <DashboardLayout menu={tenantMenu}>
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menu={tenantMenu}>
      <h1 className="text-4xl font-bold mb-8">
        My Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-xl font-semibold">
            No Requests Yet
          </h2>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {item.listing?.title}
              </h2>

              <p className="mt-2">
                📍 {item.listing?.location}
              </p>

              <p>
                ₹ {item.listing?.rent}/month
              </p>

              <p className="mt-3">
                <strong>Owner:</strong>{" "}
                {item.owner?.fullName}
              </p>

              <div className="mt-5 flex items-center gap-3">

                {item.status === "pending" && (
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                    Pending
                  </span>
                )}

                {item.status === "rejected" && (
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">
                    Rejected
                  </span>
                )}

                {item.status === "accepted" && (
                  <>
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      Accepted
                    </span>

                    <button
                      onClick={() => openChat(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      Open Chat
                    </button>
                  </>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyRequests;