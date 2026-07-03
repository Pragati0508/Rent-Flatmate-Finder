import API from "./api";

export const getAnalytics = () =>
  API.get("/admin/analytics");