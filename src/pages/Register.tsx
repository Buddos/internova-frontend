import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { User, UserCheck, Mail, Lock, AlertCircle, Building } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "COMPANY_REP">("STUDENT");
  const [studentIdNumber, setStudentIdNumber] = useState("");
  const [departmentId, setDepartmentId] = useState("");
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
          departmentId,
        } : {
          companyName,
          registrationNumber,
          industry,
        }),
      };

      await register(registerData);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-8">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-lg">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">InternOva</h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-xs sm:text-sm text-destructive">
            <AlertCircle size={16} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-xs sm:text-sm">
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
            <Label htmlFor="password" className="flex items-center gap-2 text-xs sm:text-sm">
              <Lock size={14} className="flex-shrink-0" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">Must be at least 6 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2 text-xs sm:text-sm">
              <UserCheck size={14} className="flex-shrink-0" />
              Account Type
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value as "STUDENT" | "COMPANY_REP")}>
              <SelectTrigger id="role" className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="COMPANY_REP">Company Representative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === "STUDENT" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="studentIdNumber" className="flex items-center gap-2 text-xs sm:text-sm">
                  <User size={14} className="flex-shrink-0" />
                  Student ID Number
                </Label>
                <Input
                  id="studentIdNumber"
                  type="text"
                  placeholder="STU2024001"
                  value={studentIdNumber}
                  onChange={(e) => setStudentIdNumber(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departmentId" className="flex items-center gap-2 text-xs sm:text-sm">
                  Department ID
                </Label>
                <Input
                  id="departmentId"
                  type="text"
                  placeholder="Enter department ID"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">You need to get this from your university</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2 text-xs sm:text-sm">
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
                <Label htmlFor="registrationNumber" className="flex items-center gap-2 text-xs sm:text-sm">
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
                <Label htmlFor="industry" className="flex items-center gap-2 text-xs sm:text-sm">
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

        <div className="mt-4 border-t border-border pt-4 text-center text-xs sm:text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in here
          </Link>
        </div>

        <div className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">By creating an account, you agree to our:</p>
          <p>• Terms of Service • Privacy Policy • Community Guidelines</p>
        </div>
      </Card>
    </div>
  );
}
