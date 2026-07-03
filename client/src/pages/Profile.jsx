import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import tenantMenu from "../utils/tenantMenu";

import {
  getProfile,
  saveProfile,
} from "../services/profileService";

const Profile = () => {
  const [form, setForm] = useState({
    preferredLocation: "",
    minBudget: "",
    maxBudget: "",
    moveInDate: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      if (res.data.profile) {
        setForm({
          preferredLocation:
            res.data.profile.preferredLocation || "",
          minBudget:
            res.data.profile.minBudget || "",
          maxBudget:
            res.data.profile.maxBudget || "",
          moveInDate:
            res.data.profile.moveInDate?.substring(0, 10) || "",
        });
      }
    } catch (err) {}
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProfile(form);
      toast.success("Profile Saved Successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to save profile"
      );
    }
  };

  return (
    <DashboardLayout menu={tenantMenu}>
      <h1 className="text-4xl font-bold mb-8">
        Tenant Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-xl space-y-5"
      >
        <input
          type="text"
          name="preferredLocation"
          placeholder="Preferred Location"
          value={form.preferredLocation}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <input
          type="number"
          name="minBudget"
          placeholder="Minimum Budget"
          value={form.minBudget}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <input
          type="number"
          name="maxBudget"
          placeholder="Maximum Budget"
          value={form.maxBudget}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <input
          type="date"
          name="moveInDate"
          value={form.moveInDate}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Save Profile
        </button>
      </form>
    </DashboardLayout>
  );
};

export default Profile;