import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { cn } from "../../utils/cn";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2 transition hover:bg-slate-50"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
          {initials || "U"}
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-dark">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="max-w-[140px] truncate text-xs text-slate-500">
            {user?.email}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={cn(
            "text-slate-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold text-dark">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>

            <div className="p-2">
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-dark"
              >
                <User size={16} />
                Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-dark"
              >
                <Settings size={16} />
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
