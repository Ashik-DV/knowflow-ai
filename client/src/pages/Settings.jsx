import { motion } from "framer-motion";
import {
  Building2,
  LogOut,
  Moon,
  Sun,
  User,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";
import { cn } from "../utils/cn";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const theme = localStorage.getItem("theme") || "light";

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sections = [
    {
      title: "Profile",
      icon: User,
      items: [
        { label: "First Name", value: user?.firstName },
        { label: "Last Name", value: user?.lastName },
        { label: "Email", value: user?.email },
        { label: "Role", value: user?.role?.replace("_", " ") },
      ],
    },
    {
      title: "Company",
      icon: Building2,
      items: [
        { label: "Company ID", value: user?.companyId || "—" },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
        <div>
          <h2 className="text-2xl font-bold text-dark">Settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account and preferences
          </p>
        </div>

        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <div className="rounded-xl bg-primary/10 p-2">
                <section.icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-dark">{section.title}</h3>
            </div>

            <div className="divide-y divide-border">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-sm font-medium text-dark">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          <div className="flex items-center gap-3 border-b border-border px-6 py-4">
            <div className="rounded-xl bg-secondary/10 p-2">
              <Shield size={18} className="text-secondary" />
            </div>
            <h3 className="font-semibold text-dark">Appearance</h3>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {theme === "light" ? (
                <Sun size={18} className="text-amber-500" />
              ) : (
                <Moon size={18} className="text-indigo-400" />
              )}
              <div>
                <p className="text-sm font-medium text-dark">Theme</p>
                <p className="text-xs text-slate-500">
                  Currently using {theme} mode
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className={cn(
                "relative h-7 w-12 rounded-full transition-colors",
                theme === "dark" ? "bg-primary" : "bg-slate-300"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
                  theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-dark">Sign Out</h3>
              <p className="text-sm text-slate-500">
                Log out of your KnowFlow AI account
              </p>
            </div>
            <Button variant="danger" icon={LogOut} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
