import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Grid3X3,
  List,
} from "lucide-react";
import { toast } from "react-hot-toast";

import documentService from "../services/document.service";
import UploadBox from "../components/document/UploadBox";
import DocumentCard from "../components/document/DocumentCard";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import { DocumentListSkeleton } from "../components/common/SkeletonLoader";
import { cn } from "../utils/cn";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await documentService.getDocuments();

      if (response.data.success) {
        setDocuments(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const filtered = documents.filter((doc) =>
    doc.originalFileName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await documentService.deleteDocument(deleteTarget);
      toast.success("Document deleted");
      setDeleteTarget(null);
      await loadDocuments();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        <UploadBox onUploadComplete={loadDocuments} />

        <div className="glass-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-dark">Your Documents</h2>
              <p className="text-sm text-slate-500">
                {documents.length} file{documents.length !== 1 ? "s" : ""} indexed
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field py-2.5 pl-10 text-sm"
                />
              </div>

              <div className="flex rounded-xl border border-border bg-white p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-lg p-2 transition",
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:text-dark"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-lg p-2 transition",
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:text-dark"
                  )}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <DocumentListSkeleton />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={FileText}
                title={search ? "No matching documents" : "No documents yet"}
                description={
                  search
                    ? "Try a different search term."
                    : "Upload your first PDF to start chatting with your knowledge base."
                }
              />
            ) : (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-3"
                )}
              >
                {filtered.map((doc, i) => (
                  <motion.div
                    key={doc._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <DocumentCard
                      document={doc}
                      viewMode={viewMode}
                      onDelete={() => setDeleteTarget(doc._id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!deleteTarget}
        title="Delete Document"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        confirmText="Delete"
        loading={deleting}
      >
        <p className="text-slate-600">
          Are you sure you want to delete this document? This action cannot be
          undone and the document will be removed from the knowledge base.
        </p>
      </Modal>
    </div>
  );
};

export default Documents;
