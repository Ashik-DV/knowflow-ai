import axios from "axios";
import { searchSimilarChunks } from "./search.service.js";

const GEMINI_MODEL = "gemini-3.5-flash";

const GEMINI_CHAT_URL =
  `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

export const chatService = async (user, question) => {
  // Search relevant chunks
  const chunks = await searchSimilarChunks(
    user.companyId,
    question
  );

  if (!chunks || chunks.length === 0) {
    return "I couldn't find that information in the uploaded documents.";
  }

  // Limit chunks (Very Important)
  const topChunks = chunks.slice(0, 5);

  // Build Context
  const context = topChunks
    .map((chunk) => chunk.payload.text)
    .join("\n\n");

  const prompt = `
You are KnowFlow AI.

Answer ONLY using the provided context.

If the answer is not present in the context, reply exactly:

"I couldn't find that information in the uploaded documents."

==========================
CONTEXT
==========================

${context}

==========================
QUESTION
==========================

${question}

==========================
ANSWER
==========================
`;

  try {
    console.log("========================================");
    console.log("Gemini Model :", GEMINI_MODEL);
    console.log("Chunks Used  :", topChunks.length);
    console.log("Prompt Length:", prompt.length);
    console.log("========================================");

    const response = await axios.post(
      `${GEMINI_CHAT_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],

        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    console.log("✅ Gemini Success");

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate an answer."
    );
  } catch (error) {
    console.log("========== GEMINI ERROR ==========");

    console.log("STATUS:");
    console.log(error.response?.status);

    console.log("MESSAGE:");
    console.log(error.message);

    console.log("RESPONSE:");
    console.dir(error.response?.data, {
      depth: null,
    });

    console.log("==================================");

    if (error.response?.status === 429) {
      return "Gemini API quota exceeded. Please try again later.";
    }

    if (error.response?.status === 400) {
      return "Invalid Gemini request.";
    }

    if (error.response?.status === 401) {
      return "Invalid Gemini API Key.";
    }

    if (error.response?.status === 404) {
      return "Gemini model not found.";
    }

    throw error;
  }
};