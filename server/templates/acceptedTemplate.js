const acceptedTemplate = (tenantName, listingTitle) => {
  return `
    <h2>Congratulations 🎉</h2>

    <p>Hello <b>${tenantName}</b>,</p>

    <p>Your request for</p>

    <h3>${listingTitle}</h3>

    <p>has been <b>ACCEPTED</b>.</p>

    <p>You can now start chatting with the owner.</p>

    <hr>

    <small>RoomMate AI</small>
  `;
};

export default acceptedTemplate;