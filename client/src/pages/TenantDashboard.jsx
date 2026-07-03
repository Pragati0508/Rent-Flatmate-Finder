import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

import tenantMenu from "../utils/tenantMenu";

import {
  getAllListings,
  getMyRequests,
} from "../services/tenantService";

const TenantDashboard = () => {
  const [stats, setStats] = useState({
    listings: 0,
    requests: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const listingRes = await getAllListings();
      const requestRes = await getMyRequests();

      setStats({
        listings: listingRes.data.count || 0,
        requests: requestRes.data.count || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout menu={tenantMenu}>
      <h1 className="text-4xl font-bold mb-8">
        Tenant Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <DashboardCard
          title="Available Listings"
          value={stats.listings}
        />

        <DashboardCard
          title="My Requests"
          value={stats.requests}
        />

      </div>

      <div className="bg-white rounded-xl shadow p-8 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Welcome 👋
        </h2>

        <p className="text-gray-600 leading-8">
          Browse available rooms, view AI compatibility,
          send requests to owners and chat after acceptance.
        </p>

      </div>

    </DashboardLayout>
  );
};

export default TenantDashboard;