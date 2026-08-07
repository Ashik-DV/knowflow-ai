import { Menu } from "lucide-react";
import ProfileDropdown from "../common/ProfileDropdown";

const Navbar = ({ onMenuClick, title = "AI Assistant" }) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-dark sm:text-xl">{title}</h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Ask questions about your knowledge base
          </p>
        </div>
      </div>

      <ProfileDropdown />
    </header>
  );
};

export default Navbar;
