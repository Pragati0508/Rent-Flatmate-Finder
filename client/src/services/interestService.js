import API from "./api";

// Tenant
export const sendInterest = (data) =>
  API.post("/interests", data);

export const getMyRequests = () =>
  API.get("/interests/tenant");

// Owner
export const getOwnerRequests = () =>
  API.get("/interests/owner");

export const updateInterestStatus = (id, status) =>
  API.patch(`/interests/${id}`, { status });