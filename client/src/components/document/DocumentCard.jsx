import { motion } from "framer-motion";
import { format } from "date-fns";
import { FileText, CalendarDays, Layers, Trash2, CheckCircle2 } from "lucide-react";
import { cn } from "../../utils/cn";

const DocumentCard = ({ document, onDelete, viewMode = "grid" }) => {
  const isList = viewMode === "list";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group glass-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow",
        isList ? "p-4" : "p-5"
      )}
    >
      <div className={cn("flex gap-4", isList ? "items-center" : "flex-col sm:flex-row sm:items-start")}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
          <FileText size={24} className="text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-semibold text-dark">
              {document.originalFileName}
            </h3>

            <button
              onClick={() => onDelete(document._id)}
              className="shrink-0 rounded-lg p-2 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-danger group-hover:opacity-100"
              aria-label="Delete document"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className={cn("mt-2 flex flex-wrap gap-3 text-xs text-slate-500", isList && "mt-1")}>
            <span className="flex items-center gap-1.5">
              <Layers size={14} />
              {document.totalChunks} chunks
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {format(new Date(document.createdAt), "MMM d, yyyy")}
            </span>

            <span className="flex items-center gap-1.5 text-success">
              <CheckCircle2 size={14} />
              Indexed
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
