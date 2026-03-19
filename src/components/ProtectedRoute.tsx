import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requireAuth = true
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = getRoleBasedRedirect(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case 'SUPERVISOR':
      return '/supervisor';
    case 'ADMIN':
    case 'COMPANY_REP':
      return '/verification';
    case 'STUDENT':
    default:
      return '/';
  }
}
