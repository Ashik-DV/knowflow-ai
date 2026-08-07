import { useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const ChatInput = ({ onSend, loading, value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || loading) return;
    onSend(value.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-white/80 p-4 backdrop-blur-xl sm:p-5">
      <div className="mx-auto flex max-w-4xl items-end gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask anything about your documents..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className={cn(
              "max-h-40 w-full resize-none rounded-2xl border border-border bg-white px-4 py-3.5 pr-4 text-sm outline-none transition-all",
              "placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
            )}
          />
          <p className="mt-1.5 hidden text-xs text-slate-400 sm:block">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={loading || !value.trim()}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all",
            value.trim() && !loading
              ? "gradient-btn shadow-glow"
              : "bg-slate-200 text-slate-400"
          )}
          aria-label="Send message"
        >
          <SendHorizontal size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
