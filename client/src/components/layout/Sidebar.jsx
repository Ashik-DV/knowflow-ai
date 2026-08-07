import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { to: "/dashboard", label: "Chat", icon: MessageSquare },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ isOpen, onClose, onNewChat }) => {
  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-2">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">KnowFlow AI</span>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <Plus size={18} />
          New Chat
        </motion.button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? "text-accent" : ""} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Recent Chats
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Chat history will appear here soon.
        </p>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden h-full w-72 shrink-0 flex-col bg-dark lg:flex">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-dark/60 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-dark lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
