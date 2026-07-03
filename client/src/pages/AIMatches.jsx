import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import tenantMenu from "../utils/tenantMenu";

import { getCompatibilityMatches } from "../services/compatibilityService";

const AIMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const res = await getCompatibilityMatches();
      setMatches(res.data.matches);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to generate AI matches."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout menu={tenantMenu}>
        <h2 className="text-2xl font-bold">Generating AI Matches...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menu={tenantMenu}>
      <h1 className="text-4xl font-bold mb-8">
        🤖 AI Compatibility
      </h1>

      {matches.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow">
          <h2 className="text-xl font-semibold">
            No Matches Found
          </h2>
        </div>
      ) : (
        <div className="space-y-6">
          {matches.map((item) => (
            <div
              key={item.listing._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.listing.title}
                  </h2>

                  <p className="mt-2">
                    📍 {item.listing.location}
                  </p>

                  <p className="mt-2 font-bold text-blue-600">
                    ₹ {item.listing.rent}/month
                  </p>

                  <p className="mt-2">
                    Owner : {item.listing.owner.fullName}
                  </p>
                </div>

                <div className="text-center">
                  <h1 className="text-5xl font-bold text-green-600">
                    {item.compatibility.score}%
                  </h1>

                  <p className="font-semibold mt-2">
                    Compatibility
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{
                    width: `${item.compatibility.score}%`,
                  }}
                />
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-bold mb-2">
                  AI Recommendation
                </h3>

                <p>{item.compatibility.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AIMatches;