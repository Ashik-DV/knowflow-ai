import { useState } from "react";
import { toast } from "react-hot-toast";

import DocumentCard from "./DocumentCard";
import documentService from "../../services/document.service";

const DocumentList = ({
  documents,
  selectedDocument,
  setSelectedDocument,
  loadDocuments,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    try {
      setDeleting(true);

      const res = await documentService.deleteDocument(id);

      if (res.data.success) {
        toast.success("Document Deleted");

        await loadDocuments();

        if (selectedDocument?._id === id) {
          setSelectedDocument(null);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (!documents.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          Documents
        </h2>

        <div className="flex items-center justify-center h-64 text-slate-500">
          No Documents Uploaded
        </div>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Documents
        </h2>

        <span className="text-sm text-slate-500">
          {documents.length} Files
        </span>

      </div>

      <div className="space-y-4 max-h-[650px] overflow-y-auto">

        {documents.map((doc) => (
          <DocumentCard
            key={doc._id}
            document={doc}
            selected={selectedDocument?._id === doc._id}
            onSelect={setSelectedDocument}
            onDelete={handleDelete}
            deleting={deleting}
          />
        ))}

      </div>

    </div>
  );
};

export default DocumentList;