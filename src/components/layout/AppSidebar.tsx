import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, BookOpen, User, Settings, LogOut } from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/discovery", label: "Discovery", icon: Search },
  { to: "/logbook", label: "Logbook", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
];

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside className={`fixed left-0 top-0 z-30 flex h-screen w-60 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="font-heading text-sm font-bold text-primary-foreground">◇</span>
        </div>
        <span className="font-heading text-lg font-bold text-sidebar-primary">Internova</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 pt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              <span className="font-semibold text-white">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="space-y-1 border-t border-sidebar-border px-3 py-4">
        <NavLink
          to="/settings"
          onClick={onClose}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white hover:bg-sidebar-accent/50"
        >
          <Settings size={18} />
          <span className="font-semibold">Settings</span>
        </NavLink>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive hover:bg-sidebar-accent/50">
          <LogOut size={18} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
