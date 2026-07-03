import API from "./api";

// Send a new message
export const sendMessage = (data) => {
  return API.post("/messages", data);
};

// Get conversation messages
export const getMessages = (userId, listingId) => {
  return API.get(`/messages/${userId}/${listingId}`);
};