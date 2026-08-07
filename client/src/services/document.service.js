import api from "../api/axios";

const documentService = {
  // ===========================
  // Upload PDF
  // ===========================
  uploadDocument: async (file) => {
    const formData = new FormData();

    formData.append("document", file);

    return await api.post(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  // ===========================
  // Get All Documents
  // ===========================
  getDocuments: async () => {
    return await api.get("/documents");
  },

  // ===========================
  // Delete Document
  // ===========================
  deleteDocument: async (id) => {
    return await api.delete(`/documents/${id}`);
  },
};

export default documentService;