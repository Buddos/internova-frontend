import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import ApplicantPipeline from "./pages/ApplicantPipeline";
import Discovery from "./pages/Discovery";
import LogbookCalendar from "./pages/LogbookCalendar";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import VerificationPortal from "./pages/VerificationPortal";
import Profile from "./pages/Profile";
import Settings from "./pages/Setting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes - Login and Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main App Routes - Accessible to all, auth required for certain actions */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<ApplicantPipeline />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/logbook" element={<LogbookCalendar />} />
              <Route path="/supervisor" element={<SupervisorDashboard />} />
              <Route path="/verification" element={<VerificationPortal />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
