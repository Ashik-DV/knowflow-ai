import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FileText, UploadCloud, X } from "lucide-react";
import { toast } from "react-hot-toast";

import documentService from "../../services/document.service";
import Button from "../common/Button";
import { cn } from "../../utils/cn";

const UploadBox = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    setFile(selected);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const uploadFile = async () => {
    if (!file) {
      toast.error("Select a PDF first");
      return;
    }

    try {
      setUploading(true);
      setProgress(20);

      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 90));
      }, 300);

      const res = await documentService.uploadDocument(file);

      clearInterval(progressInterval);
      setProgress(100);

      if (res.data.success) {
        toast.success("PDF uploaded and indexed successfully");
        setFile(null);
        onUploadComplete?.();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-dark">Upload Document</h2>
      <p className="mt-1 text-sm text-slate-500">
        Drag and drop your PDF or browse to upload
      </p>

      <div
        {...getRootProps()}
        className={cn(
          "mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 transition-all duration-300",
          isDragActive
            ? "scale-[1.01] border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-slate-50"
        )}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
          className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-4"
        >
          <UploadCloud size={40} className="text-primary" />
        </motion.div>

        <p className="mt-4 text-center font-medium text-dark">
          {isDragActive ? "Drop your PDF here" : "Drag & drop PDF here"}
        </p>
        <p className="mt-1 text-sm text-slate-500">or click to browse files</p>
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-slate-50 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-primary" />
            <span className="truncate text-sm font-medium">{file.name}</span>
          </div>
          <button
            onClick={() => setFile(null)}
            className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-dark"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {uploading && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Uploading & indexing...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
      )}

      <Button
        className="mt-5 w-full"
        onClick={uploadFile}
        loading={uploading}
        disabled={!file}
      >
        Upload PDF
      </Button>
    </div>
  );
};

export default UploadBox;
