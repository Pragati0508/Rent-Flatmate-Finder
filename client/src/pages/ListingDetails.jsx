import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import tenantMenu from "../utils/tenantMenu";

import {
  getListingById,
} from "../services/listingService";

import {
  sendInterest,
} from "../services/interestService";

const ListingDetails = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListing();
  }, []);

  const loadListing = async () => {
    try {
      const res = await getListingById(id);

      setListing(res.data.listing);
    } catch {
      toast.error("Unable to load listing");
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async () => {
    try {
      await sendInterest({
        listingId: listing._id,
        message: "Hi, I am interested in this room.",
      });

      toast.success("Interest Sent Successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to send interest"
      );
    }
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
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">

        {/* Main Image */}

        <img
          src={
            listing.photos && listing.photos.length > 0
              ? listing.photos[0]
              : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
          }
          alt={listing.title}
          className="w-full h-96 object-cover"
        />

        {/* Multiple Images */}

        {listing.photos && listing.photos.length > 1 && (
          <div className="grid grid-cols-5 gap-3 p-4">
            {listing.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Room ${index + 1}`}
                className="h-24 w-full rounded-lg object-cover border"
              />
            ))}
          </div>
        )}

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            {listing.title}
          </h1>

          <p className="mt-3 text-lg">
            📍 {listing.location}
          </p>

          <h2 className="mt-4 text-3xl font-bold text-blue-600">
            ₹ {listing.rent}/month
          </h2>

          <div className="flex gap-4 mt-6">

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              {listing.roomType}
            </span>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
              {listing.furnishing}
            </span>

            <span
              className={`px-4 py-2 rounded-full ${
                listing.isFilled
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {listing.isFilled ? "Filled" : "Available"}
            </span>

          </div>

          {/* Owner */}

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold mb-3">
              Owner Details
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {listing.owner?.fullName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {listing.owner?.email}
            </p>

          </div>

          {/* Description */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold">
              Description
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              {listing.description}
            </p>

          </div>

          {/* Bottom */}

          <div className="mt-10 flex justify-between items-center">

            <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full">
              🤖 AI Compatibility : 95%
            </div>

            <button
              onClick={handleInterest}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              Send Interest
            </button>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ListingDetails;