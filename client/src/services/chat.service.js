import api from "../api/axios";

const chatService = {
  // ===========================
  // Ask Question
  // ===========================
  askQuestion: async (question) => {
    return await api.post("/chat", {
      question,
    });
  },
};

export default chatService;