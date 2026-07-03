const rejectedTemplate = (tenantName, listingTitle) => {
  return `
    <h2>Request Update</h2>

    <p>Hello <b>${tenantName}</b>,</p>

    <p>Your request for</p>

    <h3>${listingTitle}</h3>

    <p>was not accepted by the owner.</p>

    <p>Don't worry—there are many more listings available.</p>

    <hr>

    <small>RoomMate AI</small>
  `;
};

export default rejectedTemplate;