import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const EmptyState = ({
  icon: Icon,
  title = "Nothing Found",
  description = "There is no data available.",
  action,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
          <Icon size={48} className="text-primary" />
        </div>
      )}

      <h2 className="text-xl font-bold text-dark sm:text-2xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500 sm:text-base">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
