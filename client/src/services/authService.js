import API from "./api";

export const loginUser = (data) =>
    API.post("/auth/login", data);

export const registerUser = (data) =>
    API.post("/auth/register", data);

export const logoutUser = () =>
    API.post("/auth/logout");

export const currentUser = () =>
    API.get("/auth/me");