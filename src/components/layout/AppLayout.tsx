import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="ml-60 flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
