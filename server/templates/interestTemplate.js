const interestTemplate = (ownerName, tenantName, listingTitle) => {
  return `
    <h2>New Interest Received</h2>

    <p>Hello <b>${ownerName}</b>,</p>

    <p><b>${tenantName}</b> is interested in your listing.</p>

    <h3>${listingTitle}</h3>

    <p>Please login to RoomMate AI to review the request.</p>

    <hr>

    <small>RoomMate AI</small>
  `;
};

export default interestTemplate;