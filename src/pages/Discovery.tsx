import AppHeader from "@/components/layout/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, Briefcase, ShieldCheck, Sparkles, ChevronDown, Search, ArrowRight, CheckCircle, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import ApplicationModal from "@/components/ApplicationModal";

const filterSections = [
  { label: "Course", options: ["Computer Science", "Information Technology", "Software Engineering", "Data Science", "Cybersecurity", "Business Administration", "Marketing", "Finance", "Engineering", "Design"] },
  { label: "Department", options: ["Engineering", "Business", "Design", "Medical", "Law"] },
  { label: "Industry", options: ["Tech", "Finance", "Healthcare", "Education", "Legal"] },
  { label: "Placement Type", options: ["On-site", "Remote", "Hybrid"] }
];


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

export default function Discovery() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ Course: true, Department: true, Industry: true, "Placement Type": true });
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({
    Course: new Set(),
    Department: new Set(),
    Industry: new Set(),
    "Placement Type": new Set()
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchVacancies = useCallback(async () => {
    try {
      setLoading(true);
      // If we have filters, we might need a different logic if backend supports it
      // For now, let's use search if there's a query, otherwise get all
      let response;
      if (searchQuery.trim()) {
        response = await api.searchVacancies(searchQuery, { page, size: 10 });
      } else {
        response = await api.getVacancies({ page, size: 10 });
      }

      let fetchedVacancies = response.vacancies;

      // Client-side filtering as a fallback if backend doesn't support filter params yet
      const hasActiveFilters = Object.values(selectedFilters).some(set => set.size > 0);
      if (hasActiveFilters) {
        fetchedVacancies = fetchedVacancies.filter(v => {
          // Course to industry mapping (simplified for demo)
          const courseToIndustry: Record<string, string[]> = {
            "Computer Science": ["Tech"],
            "Information Technology": ["Tech"],
            "Software Engineering": ["Tech"],
            "Data Science": ["Tech"],
            "Cybersecurity": ["Tech"],
            "Business Administration": ["Finance", "Business"],
            "Marketing": ["Business"],
            "Finance": ["Finance"],
            "Engineering": ["Engineering"],
            "Design": ["Design"]
          };

          const courseMatch = selectedFilters.Course.size === 0 ||
            Array.from(selectedFilters.Course).some(course =>
              courseToIndustry[course]?.includes(v.industry) || false
            );

          const deptMatch = selectedFilters.Department.size === 0 || selectedFilters.Department.has(v.industry); // Using industry as a proxy for department if necessary
          const industryMatch = selectedFilters.Industry.size === 0 || selectedFilters.Industry.has(v.industry);
          const typeMatch = selectedFilters["Placement Type"].size === 0 || selectedFilters["Placement Type"].has(v.location);
          return courseMatch && deptMatch && industryMatch && typeMatch;
        });
      }

      if (page === 0) {
        setVacancies(fetchedVacancies);
      } else {
        setVacancies(prev => [...prev, ...fetchedVacancies]);
      }
      setHasMore(page + 1 < response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Failed to fetch vacancies:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedFilters]);

  useEffect(() => {
    fetchVacancies();
  }, [page, fetchVacancies]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchVacancies();
      return;
    }

    try {
      setLoading(true);
      const response = await api.searchVacancies(searchQuery, { page: 0, size: 10 });
      setVacancies(response.vacancies);
      setHasMore(1 < response.totalPages);
      setPage(0);
    } catch (error) {
      console.error('Failed to search vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (vacancy: Vacancy) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== 'STUDENT') {
      alert("Only students can apply to vacancies.");
      return;
    }

    setSelectedVacancy(vacancy);
    setApplicationModalOpen(true);
  };

  const handleApplicationSuccess = (vacancyId: string) => {
    setAppliedIds(prev => new Set(prev).add(vacancyId));
  };

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleFilterToggle = (section: string, option: string) => {
    setSelectedFilters(prev => {
      const newSet = new Set(prev[section]);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      return { ...prev, [section]: newSet };
    });
    setPage(0); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setSelectedFilters({
      Course: new Set(),
      Department: new Set(),
      Industry: new Set(),
      "Placement Type": new Set()
    });
    setPage(0);
  };

  const hasApplied = (vacancyId: string) => {
    return appliedIds.has(vacancyId);
  };

  return (
    <>
      <AppHeader title="Internship Discovery" />
      <main className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="border-b border-border bg-card px-4 sm:px-6 py-6 sm:py-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Find Your Future Career Path</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Discover thousands of vetted internship opportunities from university-verified industry partners.</p>
          <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 sm:px-4 py-2 sm:py-2.5">
              <Search size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                placeholder="Search roles, companies, keywords"
                className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button size="lg" className="text-xs sm:text-sm whitespace-nowrap" onClick={handleSearch}>Search</Button>
          </div>
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs text-muted-foreground flex-shrink-0">Popular:</span>
            {["#MachineLearning", "#FinTech", "#Sustainability", "#Startup"].map(tag => (
              <span 
                key={tag} 
                className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground flex-shrink-0 cursor-pointer hover:bg-accent"
                onClick={() => {
                  setSearchQuery(tag.substring(1));
                  setPage(0);
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden border-b border-border px-4 sm:px-6 py-3">
            <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="flex items-center gap-2 text-sm font-medium text-primary">
              <Search size={16} />
              Filters
            </button>
          </div>

          {/* Desktop/Mobile Filter Sidebar */}
          <div className={`fixed lg:sticky top-16 lg:top-0 left-0 right-0 lg:left-auto lg:right-auto bottom-0 z-30 lg:z-auto h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-full lg:w-64 shrink-0 overflow-y-auto border-r border-border bg-card transition-transform duration-300 lg:translate-x-0 lg:block ${
            mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
            {/* Mobile close button */}
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4 lg:hidden">
              <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                <Search size={14} />
                Filters
              </h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 lg:mb-0">
                <h3 className="hidden lg:flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                  <Search size={14} />
                  Filters
                </h3>
                <button onClick={clearFilters} className="text-xs font-medium text-destructive">Reset All</button>
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
                          <label key={opt} className="flex items-center gap-2 text-xs sm:text-sm text-foreground cursor-pointer">
                            <Checkbox 
                              checked={selectedFilters[section.label].has(opt)}
                              onCheckedChange={() => handleFilterToggle(section.label, opt)}
                            />
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
                  <Sparkles size={16} className="text-primary-foreground flex-shrink-0" />
                  <span className="font-heading text-xs sm:text-sm font-bold text-primary-foreground">Verified Premium Partners</span>
                </div>
                <p className="mt-1 text-xs text-primary-foreground/80">Partners with this badge have a 95% student satisfaction rating.</p>
              </div>
            </div>
          </div>

          {/* Mobile Filter Backdrop */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setMobileFilterOpen(false)} />
          )}

          {/* Vacancy Cards */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Showing {totalElements} Opportunities</h3>
                <p className="text-xs text-muted-foreground">Matching your academic profile</p>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                Sort by:
                <Button variant="outline" size="sm" className="text-xs">Most Recent <ChevronDown size={14} /></Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vacancies.map((v) => (
                <div key={v.id} className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
                  <div className="h-1 bg-primary" />
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground flex-shrink-0">
                        {v.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center gap-1 text-xs text-success whitespace-nowrap">
                          <ShieldCheck size={14} />
                          <span className="hidden sm:inline">Verified Partner</span>
                        </span>
                      </div>
                    </div>
                    <h4 className="mt-3 font-heading text-sm font-semibold text-foreground line-clamp-2">{v.title}</h4>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Briefcase size={12} /> {v.companyName}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        <MapPin size={12} className="flex-shrink-0" /> {v.location || 'Remote'}
                      </span>
                      <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        <Briefcase size={12} className="flex-shrink-0" /> {v.industry}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">{v.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(v.createdAt).toLocaleDateString()}
                      </span>
                      {hasApplied(v.id) ? (
                        <Button size="sm" variant="outline" disabled className="gap-1 text-xs flex-1 sm:flex-none">
                          <CheckCircle size={14} />
                          <span className="hidden sm:inline">Applied</span>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={loadingIds.has(v.id)}
                          onClick={() => handleApply(v)}
                          className="gap-1 text-xs flex-1 sm:flex-none"
                        >
                          {loadingIds.has(v.id) ? "Applying..." : "Apply"} <ArrowRight size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <Button variant="outline" onClick={() => setPage(prev => prev + 1)}>Load More Results</Button>
                <span className="text-xs text-muted-foreground">Showing {vacancies.length} vacancies</span>
              </div>
            )}
          </div>
        </div>

        <footer className="border-t border-border py-4 px-4 sm:px-6 text-center text-xs text-muted-foreground">
          © 2024 Internova University Management System • Industry-Academic Partnership Program
        </footer>
      </main>

      <ApplicationModal
        open={applicationModalOpen}
        onOpenChange={setApplicationModalOpen}
        vacancy={selectedVacancy}
        onApplied={handleApplicationSuccess}
      />
    </>
  );
}
