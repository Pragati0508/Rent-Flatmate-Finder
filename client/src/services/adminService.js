
import API from "./api";

// Dashboard Stats
export const getDashboardStats = () =>
  API.get("/admin/dashboard");

// Users
export const getAllUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

// Listings
export const getAllListingsAdmin = () =>
  API.get("/admin/listings");

export const deleteListingAdmin = (id) =>
  API.delete(`/admin/listings/${id}`);