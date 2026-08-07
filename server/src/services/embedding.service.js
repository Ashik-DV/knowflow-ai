import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent";

export const generateEmbedding = async (text) => {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        model: "models/gemini-embedding-001",
        content: {
          parts: [
            {
              text,
            },
          ],
        },
      }
    );

    return response.data.embedding.values;
  } catch (error) {
    console.error("Embedding Error");

    console.error(
      error.response?.data || error.message
    );

    throw error;
  }
};