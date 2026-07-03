import API from "./api";

export const exportUsers = () =>
  API.get("/admin/export/users", {
    responseType: "blob",
  });

export const exportListings = () =>
  API.get("/admin/export/listings", {
    responseType: "blob",
  });

export const exportInterests = () =>
  API.get("/admin/export/interests", {
    responseType: "blob",
  });