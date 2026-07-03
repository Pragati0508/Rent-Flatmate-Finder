import { useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ownerMenu from "../utils/ownerMenu";
import { createListing } from "../services/listingService";

const CreateListing = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    rent: "",
    roomType: "Single",
    furnishing: "Furnished",
    availableFrom: "",
  });

  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setPhotos(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreview(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("rent", formData.rent);
      data.append("roomType", formData.roomType);
      data.append("furnishing", formData.furnishing);
      data.append("availableFrom", formData.availableFrom);

      photos.forEach((photo) => {
        data.append("photos", photo);
      });

      await createListing(data);

      toast.success("Listing Created Successfully");

      setFormData({
        title: "",
        description: "",
        location: "",
        rent: "",
        roomType: "Single",
        furnishing: "Furnished",
        availableFrom: "",
      });

      setPhotos([]);
      setPreview([]);

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to create listing"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout menu={ownerMenu}>
      <h1 className="text-3xl font-bold mb-8">
        Create Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow space-y-5"
      >
        <input
          className="w-full border rounded-lg p-3"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border rounded-lg p-3"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border rounded-lg p-3"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border rounded-lg p-3"
          type="number"
          name="rent"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
          required
        />

        <select
          className="w-full border rounded-lg p-3"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
        >
          <option>Single</option>
          <option>Double</option>
          <option>Shared</option>
        </select>

        <select
          className="w-full border rounded-lg p-3"
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
        >
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>

        <input
          className="w-full border rounded-lg p-3"
          type="date"
          name="availableFrom"
          value={formData.availableFrom}
          onChange={handleChange}
          required
        />

        <div>
          <label className="font-semibold">
            Property Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full mt-2"
          />
        </div>

        {preview.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {preview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="h-32 w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default CreateListing;