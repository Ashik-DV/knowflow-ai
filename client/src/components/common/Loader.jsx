import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Loader = ({ fullScreen = true, message = "Loading..." }) => {
  const content = (
    <div className="flex flex-col items-center gap-5">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white">
            <Sparkles size={24} className="text-primary" />
          </div>
        </div>
      </motion.div>
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );

  if (!fullScreen) return content;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      {content}
    </div>
  );
};

export default Loader;
