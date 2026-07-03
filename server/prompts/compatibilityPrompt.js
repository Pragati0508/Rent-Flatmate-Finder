const compatibilityPrompt = (listing, tenantProfile) => `
You are an AI room matching assistant.

Room Listing:

Location: ${listing.location}
Rent: ${listing.rent}

Tenant Profile:

Preferred Location: ${tenantProfile.preferredLocation}
Budget: ${tenantProfile.minBudget} - ${tenantProfile.maxBudget}

Calculate a compatibility score from 0 to 100.

Rules:
- Budget is very important.
- Location is very important.
- Higher score means better match.

Return ONLY valid JSON.

Example:

{
  "score": 92,
  "explanation": "Budget fits perfectly and preferred location matches."
}
`;

export default compatibilityPrompt;