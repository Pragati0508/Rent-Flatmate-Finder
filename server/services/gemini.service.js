import { GoogleGenAI } from "@google/genai";
import compatibilityPrompt from "../prompts/compatibilityPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateCompatibility = async (
  listing,
  tenantProfile
) => {
  try {
    const prompt = compatibilityPrompt(
      listing,
      tenantProfile
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini returns ```json
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(text);

    return {
      score:
        typeof result.score === "number"
          ? result.score
          : 50,

      explanation:
        result.explanation &&
        result.explanation.trim() !== ""
          ? result.explanation
          : "Compatibility generated using AI.",

      source: "gemini",
    };
  } catch (error) {
    console.log(
      "Gemini Error:",
      error.message
    );

    // ============================
    // FALLBACK MATCHING
    // ============================

    let score = 0;
    const explanation = [];

    // Location Match
    if (
      listing.location?.toLowerCase() ===
      tenantProfile.preferredLocation?.toLowerCase()
    ) {
      score += 60;
      explanation.push(
        "Preferred location matches."
      );
    }

    // Budget Match
    if (
      listing.rent >= tenantProfile.minBudget &&
      listing.rent <= tenantProfile.maxBudget
    ) {
      score += 40;
      explanation.push(
        "Rent is within your preferred budget."
      );
    }

    // Furnishing Bonus
    if (listing.furnishing) {
      score += 5;
      explanation.push(
        `Furnishing: ${listing.furnishing}.`
      );
    }

    // Room Type Bonus
    if (listing.roomType) {
      score += 5;
      explanation.push(
        `Room Type: ${listing.roomType}.`
      );
    }

    // Maximum Score = 100
    if (score > 100) score = 100;

    // IMPORTANT
    if (explanation.length === 0) {
      explanation.push(
        "Basic compatibility generated using fallback matching."
      );
    }

    return {
      score,
      explanation: explanation.join(" "),
      source: "fallback",
    };
  }
};