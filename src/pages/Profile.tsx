import AppHeader from "@/components/layout/AppHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Briefcase, Edit2, Download, Share2, User, Building, GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, Application } from "@/lib/api";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    course: '',
    cvUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [skills] = useState(["React", "TypeScript", "Node.js", "Tailwind CSS"]);
  const [interests] = useState(["Web Development", "UI/UX Design", "Machine Learning"]);

  useEffect(() => {
    if (user && user.role === 'STUDENT') {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const response = await api.getMyApplications({ page: 0, size: 5 });
      setApplications(response.applications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  useEffect(() => {
    if (user && user.role === 'STUDENT') {
      setFormData({
        course: user.course || '',
        cvUrl: user.cvUrl || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user || user.role !== 'STUDENT') return;

    setLoading(true);
    try {
      await api.updateStudentProfile(formData);
      await refreshUser();
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <AppHeader title="Profile" />
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <Card className="w-full max-w-md p-6 text-center">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Sign In to View Profile</h2>
              <p className="mt-2 text-sm text-muted-foreground">You need to be logged in to view your profile and track your applications.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => navigate("/login")} className="flex-1">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/register")} className="flex-1">
                  Register
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader title="Profile" />
      <main className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  {user.role === 'STUDENT' ? (user.studentIdNumber || 'Student') : (user.companyName || 'Company')}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
                <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                    <Mail size={14} />
                    {user.email}
                  </div>
                  {user.role === 'STUDENT' && user.department && (
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <GraduationCap size={14} />
                      {user.department}
                    </div>
                  )}
                  {user.role === 'COMPANY_REP' && user.industry && (
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Building size={14} />
                      {user.industry}
                    </div>
                  )}
                </div>
                {user.role === 'STUDENT' && user.profileCompletion !== undefined && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${user.profileCompletion}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{user.profileCompletion}% Complete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {user.role === 'STUDENT' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs sm:text-sm w-full sm:w-auto"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 size={14} />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              )}
              <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm w-full sm:w-auto">
                <Download size={14} />
                Resume
              </Button>
              <Button size="sm" className="gap-2 text-xs sm:text-sm w-full sm:w-auto">
                <Share2 size={14} />
                Share
              </Button>
            </div>
          </div>
        </div>

        {isEditing && user.role === 'STUDENT' && (
          <div className="border-b border-border bg-muted/50 px-4 sm:px-6 py-4">
            <Card className="p-4">
              <h3 className="font-heading text-lg font-semibold mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div>
                  <Label htmlFor="cvUrl">CV URL</Label>
                  <Input
                    id="cvUrl"
                    value={formData.cvUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvUrl: e.target.value }))}
                    placeholder="https://example.com/your-cv.pdf"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Main Content */}
          <div className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
            {/* About */}
            <Card className="p-4 sm:p-6">
              <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">About</h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Computer Science enthusiast with a passion for building great products.</p>
            </Card>

            {/* Applications */}
            <Card className="p-4 sm:p-6">
              <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Applications ({applications.length})</h2>
              <div className="mt-4 space-y-3">
                  {applications.length === 0 ? (
                    <p className="text-xs sm:text-sm text-muted-foreground">No applications yet. Start exploring opportunities!</p>
                  ) : (
                    applications.map((app) => (
                      <div key={app.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-border p-3">
                        <div className="flex-1">
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground">{app.vacancyTitle}</h3>
                          <p className="text-xs text-muted-foreground">{app.companyName} • {new Date(app.appliedAt).toLocaleDateString()}</p>
                        </div>
                        <Badge variant={app.status === "ACCEPTED" ? "default" : "outline"} className="w-fit">
                          {app.status}
                        </Badge>
                      </div>
                    ))
                  )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-4 sm:space-y-6">
            {/* Skills */}
            <Card className="p-4 sm:p-6">
              <h3 className="flex items-center gap-2 font-heading text-xs sm:text-sm font-semibold text-foreground">
                <Briefcase size={16} />
                Skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Interests */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-heading text-xs sm:text-sm font-semibold text-foreground">Interests</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}