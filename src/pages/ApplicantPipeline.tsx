import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, Target, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export default function ApplicantPipeline() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <AppHeader title="Internova" showUserMenu={false} />
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-background px-6 py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="font-heading text-5xl font-bold text-foreground">Welcome to Internova</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Your gateway to amazing internship opportunities from verified industry partners
            </p>
            {!user ? (
              <div className="mt-8 flex justify-center gap-4">
                <Button onClick={() => navigate("/register")} size="lg" className="gap-2">
                  Get Started <ArrowRight size={18} />
                </Button>
                <Button onClick={() => navigate("/login")} variant="outline" size="lg">
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="mt-8">
                <Button onClick={() => navigate("/discovery")} size="lg" className="gap-2">
                  Explore Opportunities <Sparkles size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-y border-border bg-card px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-heading text-4xl font-bold text-foreground">500+</p>
                <p className="mt-2 text-muted-foreground">Verified Companies</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-bold text-foreground">2,500+</p>
                <p className="mt-2 text-muted-foreground">Active Opportunities</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-bold text-foreground">10K+</p>
                <p className="mt-2 text-muted-foreground">Students Placed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-3xl font-bold text-foreground">Why Choose Internova?</h2>
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Smart Matching",
                  description: "Our AI-powered algorithm matches you with opportunities that fit your skills and interests.",
                },
                {
                  icon: CheckCircle,
                  title: "Verified Partners",
                  description: "All companies on Internova are vetted by universities to ensure quality experiences.",
                },
                {
                  icon: Users,
                  title: "Community Support",
                  description: "Connect with mentors, peers, and industry professionals throughout your journey.",
                },
              ].map((feature) => (
                <Card key={feature.title} className="p-6">
                  <feature.icon size={32} className="text-primary" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-border bg-muted/50 px-6 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <Briefcase size={48} className="mx-auto text-primary" />
            <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">Ready to Start Your Internship Journey?</h3>
            <p className="mt-2 text-muted-foreground">Browse thousands of opportunities from top companies and take the next step in your career.</p>
            {user ? (
              <Button onClick={() => navigate("/discovery")} size="lg" className="mt-6 gap-2">
                Browse Opportunities <ArrowRight size={18} />
              </Button>
            ) : (
              <Button onClick={() => navigate("/register")} size="lg" className="mt-6 gap-2">
                Create Your Account <ArrowRight size={18} />
              </Button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Internova - University Internship Management System • Connecting Students with Opportunities</p>
        </div>
      </main>
    </>
  );
}
