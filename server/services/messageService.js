import API from "./api";

export const sendMessage = (data) =>
  API.post("/messages", data);

export const getMessages = (userId, listingId) =>
  API.get(`/messages/${userId}/${listingId}`);