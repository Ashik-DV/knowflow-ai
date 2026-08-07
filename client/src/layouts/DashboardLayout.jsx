import { useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const pageTitles = {
  "/dashboard": "AI Assistant",
  "/documents": "Documents",
  "/settings": "Settings",
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newChatHandler, setNewChatHandler] = useState(null);
  const location = useLocation();

  const registerNewChat = useCallback((handler) => {
    setNewChatHandler(() => handler);
  }, []);

  const handleNewChat = () => {
    newChatHandler?.();
    setSidebarOpen(false);
  };

  const title = pageTitles[location.pathname] || "KnowFlow AI";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />

        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet context={{ registerNewChat }} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
