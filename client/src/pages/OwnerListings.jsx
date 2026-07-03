import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ownerMenu from "../utils/ownerMenu";

import {
  getMyListings,
  deleteListing,
  markListingFilled,
} from "../services/listingService";

const OwnerListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);

      const res = await getMyListings();

      setListings(res.data.listings);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) return;

    try {
      await deleteListing(id);

      toast.success("Listing deleted");

      fetchListings();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const handleFill = async (id) => {
    try {
      await markListingFilled(id);

      toast.success("Listing marked as Filled");

      fetchListings();
    } catch (err) {
      console.log(err);
      toast.error("Operation failed");
    }
  };

  return (
    <DashboardLayout menu={ownerMenu}>
      <h1 className="text-4xl font-bold mb-8">
        My Listings
      </h1>

      {loading ? (
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Listings Found
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {listings.map((listing) => (

            <div
              key={listing._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={
                  listing.photos?.length > 0
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

                <p className="mt-2 text-gray-600">
                  📍 {listing.location}
                </p>

                <p className="mt-2 font-bold text-blue-600">
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

                <div className="mt-4">

                  {listing.isFilled ? (
                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">
                      Filled
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      Available
                    </span>
                  )}

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <Link
                    to={`/owner/edit-listing/${listing._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

                {!listing.isFilled && (

                  <button
                    onClick={() => handleFill(listing._id)}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    Mark Filled
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>
      )}
    </DashboardLayout>
  );
};

export default OwnerListings;