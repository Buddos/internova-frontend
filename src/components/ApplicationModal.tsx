import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { AlertCircle, CheckCircle, Briefcase, MapPin, Building } from "lucide-react";

interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  companyName: string;
  industry: string;
  isActive: boolean;
  createdAt: string;
}

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: Vacancy | null;
  onApplied?: (vacancyId: string) => void;
}

export default function ApplicationModal({ open, onOpenChange, vacancy, onApplied }: ApplicationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!vacancy || !user) return;

    if (user.role !== 'STUDENT') {
      setError("Only students can apply to vacancies.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await api.applyToVacancy(vacancy.id);
      setSuccess(true);
      onApplied?.(vacancy.id);
      // Close modal after a short delay to show success message
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("Profile must be at least 60% complete")) {
          setError("Your profile must be at least 60% complete to apply. Please update your profile first.");
        } else if (err.message.includes("already applied")) {
          setError("You have already applied to this vacancy.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to apply to vacancy");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setError("");
      setSuccess(false);
    }
    onOpenChange(newOpen);
  };

  const handleUpdateProfile = () => {
    onOpenChange(false);
    navigate("/profile");
  };

  if (!vacancy) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase size={20} />
            Apply to {vacancy.title}
          </DialogTitle>
          <DialogDescription>
            Review the opportunity details and confirm your application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vacancy Details */}
          <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Building size={16} className="text-muted-foreground" />
              <span className="font-medium">{vacancy.companyName}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{vacancy.location || 'Remote'}</span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{vacancy.industry}</span>
            </div>

            <p className="text-sm text-muted-foreground mt-2">{vacancy.description}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              <CheckCircle size={16} className="flex-shrink-0" />
              Application submitted successfully!
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>

            {error.includes("60% complete") ? (
              <Button onClick={handleUpdateProfile} className="flex-1">
                Update Profile
              </Button>
            ) : (
              <Button
                onClick={handleApply}
                disabled={isLoading || success}
                className="flex-1"
              >
                {isLoading ? "Applying..." : success ? "Applied!" : "Confirm Application"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}