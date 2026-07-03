import API from "./api";

export const getProfile = () => API.get("/profile");

export const saveProfile = (data) => API.post("/profile", data);