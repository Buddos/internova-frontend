import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { Menu, X } from "lucide-react";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:block">
        <AppSidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile sidebar - toggle with menu button */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="lg:hidden">
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex w-full flex-1 flex-col lg:ml-60">
        {/* Mobile header with menu button */}
        <div className="flex items-center gap-4 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-heading text-lg font-bold">Internova</span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
