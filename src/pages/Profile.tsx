import AppHeader from "@/components/layout/AppHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Briefcase, Edit2, Download, Share2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, applications } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <AppHeader title="Profile" />
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Card className="max-w-md p-6 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">Sign In to View Profile</h2>
              <p className="mt-2 text-muted-foreground">You need to be logged in to view your profile and track your applications.</p>
              <div className="mt-6 flex gap-2">
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

  const skills = ["React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL", "Tailwind CSS"];
  const interests = ["Cloud Computing", "AI/ML", "Full-stack Development", "Startups"];

  return (
    <>
      <AppHeader title="Profile" />
      <main className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-8">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail size={14} />
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit2 size={14} />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download size={14} />
                Resume
              </Button>
              <Button size="sm" className="gap-2">
                <Share2 size={14} />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* About */}
            <Card className="p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">About</h2>
              <p className="mt-2 text-sm text-muted-foreground">Computer Science enthusiast with a passion for building great products.</p>
            </Card>

            {/* Applications */}
            <Card className="p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">Applications ({applications.length})</h2>
              <div className="mt-4 space-y-3">
                {applications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No applications yet. Start exploring opportunities!</p>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground">{app.opportunityTitle}</h3>
                        <p className="text-xs text-muted-foreground">{app.company} • {new Date(app.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={app.status === "interview" ? "default" : "outline"}>
                        {app.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                <Briefcase size={16} />
                Skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Interests */}
            <Card className="p-6">
              <h3 className="font-heading text-sm font-semibold text-foreground">Interests</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="outline">
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