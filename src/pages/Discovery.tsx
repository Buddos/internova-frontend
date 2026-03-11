import AppHeader from "@/components/layout/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, Briefcase, ShieldCheck, Sparkles, ChevronDown, Search, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const vacancies = [
  { id: "1", title: "Junior Software Engineer (Cloud Ops)", company: "TechFlow Solutions", location: "Remote / Singapore", duration: "6 Months", type: "Full-time", posted: "2 days ago", verified: true, aiMatch: 92 },
  { id: "2", title: "Data Analyst Intern", company: "FinEdge Capital", location: "New York, NY", duration: "3 Months", type: "Part-time", posted: "5 days ago", verified: true, aiMatch: 87 },
  { id: "3", title: "UI/UX Design Associate", company: "CreativePulse Agency", location: "London, UK", duration: "6 Months", type: "Full-time", posted: "1 week ago", verified: false, aiMatch: 78 },
  { id: "4", title: "AI Research Assistant", company: "NeuralNet Labs", location: "San Francisco, CA", duration: "1 Year", type: "Research", posted: "3 days ago", verified: true, aiMatch: 95 },
  { id: "5", title: "Mechanical Engineering Intern", company: "Stellar Aerospace", location: "Berlin, Germany", duration: "4 Months", type: "Full-time", posted: "Just now", verified: true, aiMatch: 71 },
  { id: "6", title: "Marketing Strategy Intern", company: "Global Retail Corp", location: "Hybrid / Austin", duration: "3 Months", type: "Part-time", posted: "4 days ago", verified: false, aiMatch: 64 },
];

const filterSections = [
  { label: "Department", options: ["Computer Science", "Engineering", "Business & Finance", "Design", "Biological Sciences"] },
  { label: "Industry", options: ["FinTech", "AI & Analytics", "Healthcare", "Aerospace", "E-commerce", "Clean Energy"] },
  { label: "Placement Type", options: ["Summer Internship", "Semester Break", "Final Year Project", "Professional Year"] },
];

export default function Discovery() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ Department: true, Industry: true, "Placement Type": true });
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const { applyForOpportunity, applications } = useAuth();
  const navigate = useNavigate();

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleApply = async (opportunityId: string, title: string, company: string) => {
    setLoadingIds(prev => new Set(prev).add(opportunityId));
    try {
      await applyForOpportunity(opportunityId, title, company);
      setAppliedIds(prev => new Set(prev).add(opportunityId));
    } catch (error) {
      if (error instanceof Error && error.message.includes("Must be logged in")) {
        navigate("/login");
      } else {
        alert(error instanceof Error ? error.message : "Failed to apply");
      }
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(opportunityId);
        return newSet;
      });
    }
  };

  const hasApplied = (opportunityId: string) => {
    return applications.some(app => app.opportunityId === opportunityId) || appliedIds.has(opportunityId);
  };

  return (
    <>
      <AppHeader title="Internship Discovery" />
      <main className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="border-b border-border bg-card px-6 py-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Find Your Future Career Path</h2>
          <p className="mt-1 text-sm text-muted-foreground">Discover thousands of vetted internship opportunities from university-verified industry partners.</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5">
              <Search size={16} className="text-muted-foreground" />
              <input placeholder="Search roles, companies, or keywords (e.g. 'Software Engineer')" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <Button size="lg">Search Vacancies</Button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {["#MachineLearning", "#FinTech", "#Sustainability", "#Startup"].map(tag => (
              <span key={tag} className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Sticky Filter Sidebar */}
          <div className="sticky top-0 h-[calc(100vh-64px)] w-64 shrink-0 overflow-y-auto border-r border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                <Search size={14} />
                Filters
              </h3>
              <button className="text-xs font-medium text-destructive">Reset All</button>
            </div>

            <div className="mt-4 space-y-5">
              {filterSections.map((section) => (
                <div key={section.label}>
                  <button onClick={() => toggleSection(section.label)} className="flex w-full items-center justify-between">
                    <span className="font-heading text-sm font-semibold text-primary">{section.label}</span>
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform ${openSections[section.label] ? "rotate-180" : ""}`} />
                  </button>
                  {openSections[section.label] && (
                    <div className="mt-2 space-y-2">
                      {section.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-sm text-foreground">
                          <Checkbox />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-primary p-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary-foreground" />
                <span className="font-heading text-sm font-bold text-primary-foreground">Verified Premium Partners</span>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/80">Partners with this badge have a 95% student satisfaction rating.</p>
            </div>
          </div>

          {/* Vacancy Cards */}
          <div className="flex-1 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Showing 428 Opportunities</h3>
                <p className="text-xs text-muted-foreground">Matching your academic profile</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by:
                <Button variant="outline" size="sm">Most Recent <ChevronDown size={14} /></Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {vacancies.map((v) => (
                <div key={v.id} className="rounded-lg border border-border bg-card">
                  <div className="border-b-2 border-primary" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                        {v.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {v.verified && (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <ShieldCheck size={14} />
                            Verified Partner
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="mt-3 font-heading text-sm font-semibold text-foreground">{v.title}</h4>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Briefcase size={12} /> {v.company}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        <MapPin size={12} /> {v.location}
                      </span>
                      <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        <Clock size={12} /> {v.duration}
                      </span>
                      <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        <Briefcase size={12} /> {v.type}
                      </span>
                    </div>
                    {/* AI Match Badge */}
                    <div className="mt-3">
                      <Badge variant="ai" className="gap-1">
                        <Sparkles size={12} />
                        AI Match: {v.aiMatch}%
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{v.posted}</span>
                      {hasApplied(v.id) ? (
                        <Button size="sm" variant="outline" disabled className="gap-1">
                          <CheckCircle size={14} />
                          Applied
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          disabled={loadingIds.has(v.id)}
                          onClick={() => handleApply(v.id, v.title, v.company)}
                        >
                          {loadingIds.has(v.id) ? "Applying..." : "Apply"} <ArrowRight size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-2">
              <Button variant="outline">Load More Results</Button>
              <span className="text-xs text-muted-foreground">Showing 6 of 428 vacancies</span>
            </div>
          </div>
        </div>

        <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2024 Internova University Management System • Industry-Academic Partnership Program
        </footer>
      </main>
    </>
  );
}
