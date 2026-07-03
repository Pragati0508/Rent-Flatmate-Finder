import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ownerMenu from "../utils/ownerMenu";
import tenantMenu from "../utils/tenantMenu";

import useAuth from "../hooks/useAuth";
import { getAllListings } from "../services/listingService";

const Listings = () => {
  const { user } = useAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [location, setLocation] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);

      const res = await getAllListings({
        location,
        minBudget,
        maxBudget,
      });

      setListings(res.data.listings);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const menu =
    user?.role === "owner"
      ? ownerMenu
      : tenantMenu;

  return (
    <DashboardLayout menu={menu}>
      <h1 className="text-4xl font-bold mb-8">
        Browse Listings
      </h1>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Minimum Budget"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Maximum Budget"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <button
            onClick={fetchListings}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Search
          </button>

        </div>
      </div>

      {/* Listings */}

      {loading ? (
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold">
            No Listings Available
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {listings.map((listing) => (

            <div
              key={listing._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* Listing Image */}

              <img
                src={
                  listing.photos &&
                  listing.photos.length > 0
                    ? listing.photos[0]
                    : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
                }
                alt={listing.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {listing.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  📍 {listing.location}
                </p>

                <p className="mt-2 text-blue-600 font-bold">
                  ₹ {listing.rent}/month
                </p>

                <div className="flex justify-between mt-4">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {listing.roomType}
                  </span>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {listing.furnishing}
                  </span>

                </div>

                <div className="flex justify-between mt-4">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    AI Match 95%
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      listing.isFilled
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {listing.isFilled ? "Filled" : "Available"}
                  </span>

                </div>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/listing/${listing._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700"
                  >
                    View
                  </Link>

                  {user?.role === "tenant" && (
                    <button
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Interested
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}
    </DashboardLayout>
  );
};

export default Listings;