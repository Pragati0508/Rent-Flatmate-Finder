import { useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ownerMenu from "../utils/ownerMenu";
import useAuth from "../hooks/useAuth";

const OwnerProfile = () => {
  const { user } = useAuth();

  const [form] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  return (
    <DashboardLayout menu={ownerMenu}>
      <h1 className="text-4xl font-bold mb-8">
        Owner Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl space-y-5">

        <div>
          <label className="font-semibold">Full Name</label>

          <input
            value={form.fullName}
            disabled
            className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>

          <input
            value={form.email}
            disabled
            className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Role</label>

          <input
            value={form.role}
            disabled
            className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
          />
        </div>

        <button
          onClick={() => toast.success("Profile Loaded")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          OK
        </button>

      </div>
    </DashboardLayout>
  );
};

export default OwnerProfile;