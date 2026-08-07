import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
        <Bot size={16} className="text-white" />
      </div>

      <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-soft">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="h-2 w-2 rounded-full bg-slate-400"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
