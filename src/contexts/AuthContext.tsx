import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";

export interface User {
  email: string;
  role: "STUDENT" | "COMPANY_REP" | "SUPERVISOR" | "ADMIN";
  status?: string;
  // Additional fields based on role
  id?: string;
  studentIdNumber?: string;
  course?: string;
  cvUrl?: string;
  profileCompletion?: number;
  department?: string;
  companyName?: string;
  registrationNumber?: string;
  industry?: string;
  isVerified?: boolean;
}

export interface Application {
  id: string;
  vacancyTitle: string;
  companyName: string;
  status: "APPLIED" | "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  appliedAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    role: "STUDENT" | "COMPANY_REP";
    studentIdNumber?: string;
    departmentId?: string;
    companyName?: string;
    registrationNumber?: string;
    industry?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await api.getCurrentUser();
      // Get additional profile data based on role
      let profileData = null;
      if (userData.role === 'STUDENT') {
        try {
          profileData = await api.getStudentProfile();
        } catch (error) {
          console.error('Failed to get student profile:', error);
        }
      } else if (userData.role === 'COMPANY_REP') {
        try {
          profileData = await api.getCompanyProfile();
        } catch (error) {
          console.error('Failed to get company profile:', error);
        }
      }

      setUser({
        ...userData,
        ...profileData,
      });
    } catch (error) {
      // User is not authenticated or API error
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    await api.login(email, password);
    // After successful login, get user data
    await checkAuthStatus();
  };

  const register = async (data: {
    email: string;
    password: string;
    role: "STUDENT" | "COMPANY_REP";
    studentIdNumber?: string;
    departmentId?: string;
    companyName?: string;
    registrationNumber?: string;
    industry?: string;
  }) => {
    await api.register(data);
    // After successful registration, login automatically
    await login(data.email, data.password);
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      // Even if logout fails, clear local state
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    await checkAuthStatus();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
