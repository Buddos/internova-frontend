import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "company" | "supervisor";
  avatar?: string;
}

export interface Application {
  id: string;
  userId: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  appliedDate: string;
  status: "pending" | "interview" | "accepted" | "rejected";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  applications: Application[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "student" | "company" | "supervisor") => Promise<void>;
  logout: () => void;
  applyForOpportunity: (opportunityId: string, opportunityTitle: string, company: string) => Promise<void>;
  getApplications: () => Application[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  // Simulate loading user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedApplications = localStorage.getItem("applications");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call - in real app, this would validate against a backend
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create mock user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role: "student",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const register = async (name: string, email: string, password: string, role: "student" | "company" | "supervisor") => {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setApplications([]);
    localStorage.removeItem("user");
    localStorage.removeItem("applications");
  };

  const applyForOpportunity = async (opportunityId: string, opportunityTitle: string, company: string) => {
    if (!user) {
      throw new Error("Must be logged in to apply");
    }

    // Check if already applied
    const alreadyApplied = applications.some(
      app => app.userId === user.id && app.opportunityId === opportunityId
    );

    if (alreadyApplied) {
      throw new Error("You have already applied for this opportunity");
    }

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      userId: user.id,
      opportunityId,
      opportunityTitle,
      company,
      appliedDate: new Date().toISOString(),
      status: "pending",
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
  };

  const getApplications = () => {
    if (!user) return [];
    return applications.filter(app => app.userId === user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        applications: user ? applications.filter(app => app.userId === user.id) : [],
        login,
        register,
        logout,
        applyForOpportunity,
        getApplications,
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
