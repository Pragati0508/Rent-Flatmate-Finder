import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ownerMenu from "../utils/ownerMenu";

import {
  getListingById,
  updateListing,
} from "../services/listingService";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [photos, setPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    rent: "",
    availableFrom: "",
    roomType: "Single",
    furnishing: "Furnished",
  });

  useEffect(() => {
    loadListing();
  }, []);

  const loadListing = async () => {
    try {
      const res = await getListingById(id);

      const listing = res.data.listing;

      setFormData({
        title: listing.title,
        description: listing.description,
        location: listing.location,
        rent: listing.rent,
        availableFrom: listing.availableFrom
          ? listing.availableFrom.slice(0, 10)
          : "",
        roomType: listing.roomType,
        furnishing: listing.furnishing,
      });
    } catch (err) {
      console.log(err);
      toast.error("Unable to load listing");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      photos.forEach((photo) => {
        data.append("photos", photo);
      });

      await updateListing(id, data);

      toast.success("Listing Updated Successfully");

      navigate("/owner/listings");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to update listing"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout menu={ownerMenu}>
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </DashboardLayout>
    );
  } 
    return (
    <DashboardLayout menu={ownerMenu}>
      <h1 className="text-3xl font-bold mb-8">
        Edit Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >

        <input
          type="text"
          name="title"
          placeholder="Listing Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="date"
          name="availableFrom"
          value={formData.availableFrom}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Shared">Shared</option>
        </select>

        <select
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Furnished">
            Furnished
          </option>

          <option value="Semi-Furnished">
            Semi-Furnished
          </option>

          <option value="Unfurnished">
            Unfurnished
          </option>
        </select>

        <div>

          <label className="block mb-2 font-semibold">
            Upload New Photos
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border rounded-lg p-2"
          />

          {photos.length > 0 && (

            <div className="grid grid-cols-4 gap-3 mt-4">

              {photos.map((photo, index) => (

                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt=""
                  className="h-24 w-full rounded-lg object-cover"
                />

              ))}

            </div>

          )}

        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
        >
          {saving
            ? "Updating..."
            : "Update Listing"}
        </button>

      </form>

    </DashboardLayout>
  );
};

export default EditListing;