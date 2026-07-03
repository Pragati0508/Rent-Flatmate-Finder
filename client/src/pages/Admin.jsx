import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import adminMenu from "../utils/adminMenu";

import {
  getDashboardStats,
  getAllUsers,
  getAllListingsAdmin,
  deleteUser,
  deleteListingAdmin,
} from "../services/adminService";

import {
  exportUsers,
  exportListings,
  exportInterests,
} from "../services/exportService";

const Admin = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userSearch, setUserSearch] = useState("");
  const [listingSearch, setListingSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [statsRes, usersRes, listingsRes] = await Promise.all([
        getDashboardStats(),
        getAllUsers(),
        getAllListingsAdmin(),
      ]);

      setStats(statsRes.data.stats || {});
      setUsers(usersRes.data.users || []);
      setListings(listingsRes.data.listings || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User Deleted");
      loadData();
    } catch {
      toast.error("Unable to delete user");
    }
  };

  const removeListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      await deleteListingAdmin(id);
      toast.success("Listing Deleted");
      loadData();
    } catch {
      toast.error("Unable to delete listing");
    }
  };

  // ============================
  // CSV Export
  // ============================

  const downloadCSV = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob]));

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();
  };

  const handleExportUsers = async () => {
    try {
      const res = await exportUsers();

      downloadCSV(res.data, "users.csv");

      toast.success("Users Exported");
    } catch (err) {
      console.log(err);

      toast.error("Export Failed");
    }
  };

  const handleExportListings = async () => {
    try {
      const res = await exportListings();

      downloadCSV(res.data, "listings.csv");

      toast.success("Listings Exported");
    } catch (err) {
      console.log(err);

      toast.error("Export Failed");
    }
  };

  const handleExportInterests = async () => {
    try {
      const res = await exportInterests();

      downloadCSV(res.data, "interests.csv");

      toast.success("Interests Exported");
    } catch (err) {
      console.log(err);

      toast.error("Export Failed");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = user?.fullName || "";
      const email = user?.email || "";

      return (
        fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
        email.toLowerCase().includes(userSearch.toLowerCase())
      );
    });
  }, [users, userSearch]);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const title = listing?.title || "";
      const location = listing?.location || "";

      return (
        title.toLowerCase().includes(listingSearch.toLowerCase()) ||
        location.toLowerCase().includes(listingSearch.toLowerCase())
      );
    });
  }, [listings, listingSearch]);

  if (loading) {
    return (
      <DashboardLayout menu={adminMenu}>
        <h1 className="text-3xl font-bold">
          Loading Admin Dashboard...
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menu={adminMenu}>
      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Export Buttons */}

      <div className="flex gap-4 mb-8 flex-wrap">

        <button
          onClick={handleExportUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          ⬇ Export Users
        </button>

        <button
          onClick={handleExportListings}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          ⬇ Export Listings
        </button>

        <button
          onClick={handleExportInterests}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
        >
          ⬇ Export Interests
        </button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">

        <DashboardCard title="Users" value={stats.totalUsers || 0} />
        <DashboardCard title="Owners" value={stats.totalOwners || 0} />
        <DashboardCard title="Tenants" value={stats.totalTenants || 0} />
        <DashboardCard title="Listings" value={stats.totalListings || 0} />
        <DashboardCard title="Filled Listings" value={stats.filledListings || 0} />
        <DashboardCard title="Interest Requests" value={stats.totalInterests || 0} />
        <DashboardCard title="Messages" value={stats.totalMessages || 0} />

      </div>

      {/* Users */}

      <div className="bg-white rounded-xl shadow p-6 mb-10">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">Users</h2>

          <input
            type="text"
            placeholder="Search User..."
            className="border rounded-lg px-4 py-2 w-72"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-2">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user._id} className="border-b">

                <td className="py-3">{user.fullName}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    onClick={() => removeUser(user._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Listings */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">Listings</h2>

          <input
            type="text"
            placeholder="Search Listing..."
            className="border rounded-lg px-4 py-2 w-72"
            value={listingSearch}
            onChange={(e) => setListingSearch(e.target.value)}
          />

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-2">Title</th>
              <th className="text-left">Owner</th>
              <th className="text-left">Location</th>
              <th className="text-left">Rent</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            {filteredListings.map((listing) => (

              <tr key={listing._id} className="border-b">

                <td className="py-3">{listing.title}</td>

                <td>{listing.owner?.fullName || "N/A"}</td>

                <td>{listing.location || "N/A"}</td>

                <td>₹ {listing.rent}</td>

                <td>

                  <button
                    onClick={() => removeListing(listing._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default Admin;