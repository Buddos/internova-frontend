import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes - Login and Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main App Routes - Accessible to all, auth required for certain actions */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<ApplicantPipeline />} />
              <Route path="/discovery" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <Discovery />
                </ProtectedRoute>
              } />
              <Route path="/logbook" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <LogbookCalendar />
                </ProtectedRoute>
              } />
              <Route path="/supervisor" element={
                <ProtectedRoute allowedRoles={['SUPERVISOR', 'ADMIN']}>
                  <SupervisorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/verification" element={
                <ProtectedRoute allowedRoles={['COMPANY_REP', 'ADMIN']}>
                  <VerificationPortal />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
