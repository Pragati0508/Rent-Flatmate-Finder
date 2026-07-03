import API from "./api";

export const getAllListings = () =>
  API.get("/listings");

export const getCompatibility = () =>
  API.get("/compatibility");

export const getMyRequests = () =>
  API.get("/interests/tenant");

export const sendInterest = (data) =>
  API.post("/interests", data);