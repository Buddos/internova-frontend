import AppHeader from "@/components/layout/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, ShieldCheck, AlertTriangle, UserX, Search, Filter, MoreHorizontal, Clock, FileText, Lock } from "lucide-react";

const kpis = [
  { label: "Total Students", value: "24", sub: "+2 this month", detail: "Across 4 Departments", icon: Users },
  { label: "Highly Compliant", value: "16", sub: "", detail: "Logbooks up to date", icon: ShieldCheck },
  { label: "Action Required", value: "3", sub: "", detail: "Critical compliance gaps", icon: AlertTriangle },
  { label: "Incomplete Profiles", value: "5", sub: "", detail: "Below 60% completion", icon: UserX },
];

const students = [
  { name: "Alex Rivera", id: "STU-001", dept: "Computer Science", company: "TechFlow Systems", compliance: "green", profile: 85, profileStatus: "Ready" as const, lastActivity: "2 hours ago", activityType: "Logbook Verification" },
  { name: "Jordan Chen", id: "STU-002", dept: "Software Engineering", company: "DataGrid Corp", compliance: "yellow", profile: 72, profileStatus: "Ready" as const, lastActivity: "3 days ago", activityType: "Logbook Verification" },
  { name: "Maya Johnson", id: "STU-003", dept: "Information Systems", company: "Pending Placement", compliance: "red", profile: 45, profileStatus: "Locked" as const, lastActivity: "1 week ago", activityType: "Logbook Verification", incomplete: true },
  { name: "Liam O'Connor", id: "STU-004", dept: "Cyber Security", company: "ShieldNet", compliance: "green", profile: 92, profileStatus: "Ready" as const, lastActivity: "5 hours ago", activityType: "Logbook Verification" },
  { name: "Sofia Rodriguez", id: "STU-005", dept: "Digital Arts", company: "Creative Pulse", compliance: "yellow", profile: 58, profileStatus: "Locked" as const, lastActivity: "Yesterday", activityType: "Logbook Verification", incomplete: true },
];

const complianceDot: Record<string, string> = {
  green: "bg-success",
  yellow: "bg-warning",
  red: "bg-destructive",
};

const profileBarColor: Record<string, string> = {
  Ready: "[&>div]:bg-success",
  Locked: "[&>div]:bg-destructive",
};

const updates = [
  { month: "MAR", title: "Updated Safety Compliance Protocols", date: "2 days ago", desc: "New guidelines for remote-first internships have been released. Supervisors are required to check the digital safety checklist for all current placements." },
  { month: "FEB", title: "Industry Partner Networking Event Q2", date: "2 days ago", desc: "Join us for the semi-annual partnership meeting to explore new placement opportunities for final year students." },
];

export default function SupervisorDashboard() {
  return (
    <>
      <AppHeader title="Student Supervision" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-heading text-lg sm:text-xl font-semibold text-foreground">Active Supervision Portfolio</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Monitor compliance, track logbook progress, and manage student readiness.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="text-xs sm:text-sm gap-2 w-full sm:w-auto">
              <FileText size={14} />
              Export Report
            </Button>
            <Button className="text-xs sm:text-sm gap-2 w-full sm:w-auto">
              <Users size={14} />
              Assign New
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-lg border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{kpi.label}</span>
                <kpi.icon size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
              <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-foreground">{kpi.value}
                {kpi.sub && <span className="ml-2 text-xs font-normal text-muted-foreground whitespace-nowrap">{kpi.sub}</span>}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.detail}</p>
            </div>
          ))}
        </div>

        {/* Monitoring Roster */}
        <div className="mt-8">
          <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Monitoring Roster</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Real-time status tracking for assigned internship candidates.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 flex-1 sm:flex-none">
                <Search size={14} className="text-muted-foreground flex-shrink-0" />
                <input placeholder="Search by name or ID..." className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm outline-none placeholder:text-muted-foreground" />
              </div>
              <Button variant="outline" size="icon" className="flex-shrink-0"><Filter size={14} /></Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-muted-foreground text-[10px] sm:text-xs">Student Details</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-muted-foreground text-[10px] sm:text-xs">Compliance Status</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-muted-foreground text-[10px] sm:text-xs">Profile Completion</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-muted-foreground text-[10px] sm:text-xs">Last Activity</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{s.name}</span>
                            {s.incomplete && <Badge variant="danger">Incomplete</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{s.id} • {s.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${complianceDot[s.compliance]}`} />
                        <span className="text-sm text-foreground">{s.compliance}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{s.company}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{s.profile}%</span>
                        <span className={`flex items-center gap-1 text-xs ${s.profileStatus === "Ready" ? "text-success" : "text-destructive"}`}>
                          {s.profileStatus === "Ready" ? <Clock size={12} /> : <Lock size={12} />}
                          {s.profileStatus}
                        </span>
                      </div>
                      <Progress value={s.profile} className={`mt-1 h-1.5 ${profileBarColor[s.profileStatus]}`} />
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-foreground">{s.lastActivity}</p>
                      <p className="text-xs text-muted-foreground">{s.activityType}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <span className="text-xs text-muted-foreground">Showing 5 students</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex gap-6">
          {/* Recent Program Updates */}
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Program Updates</h3>
            <p className="text-sm text-muted-foreground">Important notices regarding university internship policies.</p>
            <div className="mt-4 space-y-3">
              {updates.map((u) => (
                <div key={u.title} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                    <span className="font-heading text-xs font-bold text-primary">{u.month}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-heading text-sm font-semibold text-foreground">{u.title}</p>
                      <span className="text-xs text-muted-foreground">{u.date}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Summary */}
          <div className="w-72 shrink-0 rounded-lg border border-border bg-card p-5">
            <h3 className="font-heading text-sm font-semibold text-foreground">Compliance Summary</h3>
            <p className="text-xs text-muted-foreground">Overview of logbook health.</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Portfolio Health</span>
              <span className="font-heading font-semibold text-success">Good</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-md border border-border p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Late Logs</p>
                <p className="mt-1 font-heading text-2xl font-bold text-foreground">08</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Unverified</p>
                <p className="mt-1 font-heading text-2xl font-bold text-foreground">12</p>
              </div>
            </div>
            <Button className="mt-4 w-full">Review All Pending Logs</Button>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">Last sync with university registrar: Today at 09:00 AM</p>
          </div>
        </div>

        <footer className="mt-8 border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2024 Internova University Management System • Industry-Academic Partnership Program
        </footer>
      </main>
    </>
  );
}
