import API from "./api";

export const getCompatibilityMatches = () => {
  return API.get("/compatibility/matches");
};