import { Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface AppHeaderProps {
  title: string;
  showUserMenu?: boolean;
}

export default function AppHeader({ title, showUserMenu = true }: AppHeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      <h1 
        onClick={() => navigate("/")} 
        className="cursor-pointer font-heading text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors truncate"
      >
        {title}
      </h1>
      <div className="flex items-center gap-2 sm:gap-4">
        {user && showUserMenu ? (
          <>
            <button onClick={() => navigate("/settings")} className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors" title="Settings">
              <Settings size={18} />
            </button>
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors" title="Notifications">
              <Bell size={18} />
            </button>
            <div className="relative">
              <div 
                onClick={() => setShowLogoutMenu(!showLogoutMenu)} 
                className="flex items-center gap-2 sm:gap-3 cursor-pointer rounded-md p-1 hover:bg-muted transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {user.role === 'STUDENT' ? (user.studentIdNumber || user.email.split('@')[0]) : (user.companyName || user.email.split('@')[0])}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                  <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              {showLogoutMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg z-50">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted first:rounded-t-md"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-destructive hover:bg-muted last:rounded-b-md"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/login")} size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button onClick={() => navigate("/register")} size="sm" className="text-xs sm:text-sm">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
