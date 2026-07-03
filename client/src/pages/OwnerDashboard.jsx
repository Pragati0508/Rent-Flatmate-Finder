import { useEffect, useState } from "react";
import {
  FaHome,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

import ownerMenu from "../utils/ownerMenu";

import { getMyListings } from "../services/listingService";
import { getOwnerRequests } from "../services/interestService";

const OwnerDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    filled: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [listingRes, requestRes] = await Promise.all([
        getMyListings(),
        getOwnerRequests(),
      ]);

      const listings = listingRes.data.listings;
      const requests = requestRes.data.requests;

      setStats({
        total: listings.length,
        available: listings.filter((item) => !item.isFilled).length,
        filled: listings.filter((item) => item.isFilled).length,
        pending: requests.filter((item) => item.status === "pending").length,
        accepted: requests.filter((item) => item.status === "accepted").length,
        rejected: requests.filter((item) => item.status === "rejected").length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Total Listings",
      value: stats.total,
      icon: <FaHome className="text-4xl text-blue-600" />,
      bg: "from-blue-500 to-indigo-600",
    },
    {
      title: "Available",
      value: stats.available,
      icon: <FaClipboardList className="text-4xl text-green-600" />,
      bg: "from-green-500 to-emerald-600",
    },
    {
      title: "Filled",
      value: stats.filled,
      icon: <FaCheckCircle className="text-4xl text-yellow-500" />,
      bg: "from-yellow-400 to-orange-500",
    },
    {
      title: "Pending Requests",
      value: stats.pending,
      icon: <FaClock className="text-4xl text-purple-600" />,
      bg: "from-purple-500 to-pink-500",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <FaThumbsUp className="text-4xl text-teal-600" />,
      bg: "from-teal-500 to-cyan-500",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle className="text-4xl text-red-500" />,
      bg: "from-red-500 to-rose-600",
    },
  ];

  return (
    <DashboardLayout menu={ownerMenu}>
      {/* Welcome Banner */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-3xl text-white p-8 mb-10 shadow-xl">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          Manage your properties, requests and tenants from one dashboard.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >

            <div className={`h-2 bg-gradient-to-r ${card.bg}`} />

            <div className="p-6 flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm font-semibold uppercase">
                  {card.title}
                </p>

                <h2 className="text-5xl font-bold mt-3 text-gray-800">
                  {card.value}
                </h2>

              </div>

              <div className="bg-gray-100 p-4 rounded-2xl">
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Quick Tips */}

      <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-5">
          Quick Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="font-bold text-blue-700">
              🏠 Active Listings
            </h3>

            <p className="mt-2 text-gray-600">
              Keep your listings updated with the latest availability and photos.
            </p>

          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h3 className="font-bold text-green-700">
              💬 Tenant Requests
            </h3>

            <p className="mt-2 text-gray-600">
              Respond quickly to improve your chances of finding tenants.
            </p>

          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h3 className="font-bold text-yellow-700">
              📈 Performance
            </h3>

            <p className="mt-2 text-gray-600">
              Filled listings and accepted requests help you grow faster.
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default OwnerDashboard;