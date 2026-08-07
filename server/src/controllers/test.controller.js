import axios from "axios";

export const listModels = async (req, res) => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json(err.response?.data || err.message);
  }
};