import API from "./api";

// ===============================
// Owner
// ===============================

export const getMyListings = () =>
  API.get("/listings/owner/my-listings");

export const createListing = (data) =>
  API.post("/listings", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateListing = (id, data) =>
  API.put(`/listings/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteListing = (id) =>
  API.delete(`/listings/${id}`);

export const markListingFilled = (id) =>
  API.patch(`/listings/${id}/fill`);

// ===============================
// Public / Tenant
// ===============================

export const getAllListings = (filters = {}) =>
  API.get("/listings", {
    params: filters,
  });

export const getListingById = (id) =>
  API.get(`/listings/${id}`);