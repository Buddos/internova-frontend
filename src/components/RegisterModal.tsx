import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { User, UserCheck, Mail, Lock, AlertCircle, Building } from "lucide-react";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterModal({ open, onOpenChange, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "COMPANY_REP" | "SUPERVISOR">("STUDENT");
  const [studentIdNumber, setStudentIdNumber] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const registerData = {
        email,
        password,
        role,
        ...(role === "STUDENT" ? {
          studentIdNumber,
          departmentName,
        } : role === "COMPANY_REP" ? {
          companyName,
          registrationNumber,
          industry,
        } : role === "SUPERVISOR" ? {
          // Supervisors might need additional fields in the future
        } : {}),
      };

      await register(registerData);
      onOpenChange(false);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setEmail("");
      setPassword("");
      setRole("STUDENT");
      setStudentIdNumber("");
      setDepartmentName("");
      setCompanyName("");
      setRegistrationNumber("");
      setIndustry("");
      setError("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Create your Internova account</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle size={16} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-sm">
              <Mail size={14} className="flex-shrink-0" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2 text-sm">
              <Lock size={14} className="flex-shrink-0" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">Must be at least 6 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2 text-sm">
              <UserCheck size={14} className="flex-shrink-0" />
              Account Type
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value as "STUDENT" | "COMPANY_REP" | "SUPERVISOR")}>
              <SelectTrigger id="role" className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="COMPANY_REP">Company Representative</SelectItem>
                <SelectItem value="SUPERVISOR">Academic Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === "STUDENT" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="studentIdNumber" className="flex items-center gap-2 text-sm">
                  <User size={14} className="flex-shrink-0" />
                  Student Registration Number
                </Label>
                <Input
                  id="studentIdNumber"
                  type="text"
                  placeholder="Enter your student registration number"
                  value={studentIdNumber}
                  onChange={(e) => setStudentIdNumber(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departmentName" className="flex items-center gap-2 text-sm">
                  Department Name
                </Label>
                <Input
                  id="departmentName"
                  type="text"
                  placeholder="Enter department name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">Your academic department</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2 text-sm">
                  <Building size={14} className="flex-shrink-0" />
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Tech Solutions Inc"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber" className="flex items-center gap-2 text-sm">
                  Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  type="text"
                  placeholder="REG123456"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="flex items-center gap-2 text-sm">
                  Industry
                </Label>
                <Input
                  id="industry"
                  type="text"
                  placeholder="Technology"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onSwitchToLogin?.();
            }}
            className="font-medium text-primary hover:underline"
          >
            Sign in here
          </button>
        </div>

        <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">By creating an account, you agree to our:</p>
          <p>• Terms of Service • Privacy Policy • Community Guidelines</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}