import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import adminMenu from "../utils/adminMenu";

import { getAnalytics } from "../services/analyticsService";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

import {
  Pie,
  Bar,
  Doughnut,
  Line,
} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await getAnalytics();
      setAnalytics(res.data.analytics);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load analytics.");
    }
  };

  if (!analytics) {
    return (
      <DashboardLayout menu={adminMenu}>
        <h2 className="text-3xl font-bold">
          Loading Analytics...
        </h2>
      </DashboardLayout>
    );
  }

  // Users By Role
  const pieData = {
    labels: analytics.usersByRole.map((i) => i._id || "Unknown"),
    datasets: [
      {
        label: "Users",
        data: analytics.usersByRole.map((i) => i.count),
      },
    ],
  };

  // Listing Status
  const barData = {
    labels: ["Available", "Filled"],
    datasets: [
      {
        label: "Listings",
        data: [
          analytics.listingStatus.available,
          analytics.listingStatus.filled,
        ],
      },
    ],
  };

  // Monthly Users
  const lineData = {
    labels: analytics.monthlyUsers.map((i) => `Month ${i._id}`),
    datasets: [
      {
        label: "Users Registered",
        data: analytics.monthlyUsers.map((i) => i.count),
      },
    ],
  };

  // Monthly Listings
  const doughnutData = {
    labels: analytics.monthlyListings.map((i) => `Month ${i._id}`),
    datasets: [
      {
        label: "Listings",
        data: analytics.monthlyListings.map((i) => i.count),
      },
    ],
  };

  return (
    <DashboardLayout menu={adminMenu}>
      <h1 className="text-4xl font-bold mb-8">
        📊 Analytics Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Users By Role
          </h2>

          <Pie data={pieData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Listing Status
          </h2>

          <Bar data={barData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Monthly Users
          </h2>

          <Line data={lineData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Monthly Listings
          </h2>

          <Doughnut data={doughnutData} />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Analytics;