import AppHeader from "@/components/layout/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, FileText, AlertTriangle, ChevronLeft, ChevronRight, Clock, Award, Info, Download } from "lucide-react";
import { useState, useEffect } from "react";

type DayStatus = "verified" | "draft" | "missing" | "penalty" | "empty" | "today";

interface DayData {
  day: number;
  hours?: number;
  task?: string;
  status: DayStatus;
}

const calendarData: DayData[] = [
  { day: 1, hours: 8, task: "Front-end Refactoring", status: "verified" },
  { day: 2, hours: 8, task: "API Integration", status: "verified" },
  { day: 3, hours: 7.5, task: "Team Standup &...", status: "verified" },
  { day: 4, hours: 8, task: "Team Building", status: "draft" },
  { day: 5, hours: 8, task: "Bug Hunting", status: "verified" },
  { day: 6, hours: 8, task: "UI Component", status: "verified" },
  { day: 7, status: "empty" },
  { day: 8, hours: 8, task: "State Management", status: "verified" },
  { day: 9, hours: 8, task: "Unit Testing", status: "verified" },
  { day: 10, hours: 8, task: "Backend Sync", status: "verified" },
  { day: 11, status: "penalty" },
  { day: 12, hours: 8, task: "Code Review", status: "verified" },
  { day: 13, status: "empty" },
  { day: 14, status: "empty" },
  { day: 15, hours: 8, task: "Design System Review", status: "verified" },
  { day: 16, hours: 8, task: "Database Migration", status: "verified" },
  { day: 17, hours: 4, task: "Auth Flow Implementation", status: "draft" },
  { day: 18, hours: 2, task: "Documentation draft", status: "draft" },
  { day: 19, status: "today" },
  { day: 20, status: "empty" },
  ...Array.from({ length: 12 }, (_, i) => ({ day: i + 21, status: "empty" as DayStatus })),
];

// Pad the start (May 2024 starts on Wednesday)
const startPadding = 2; // Mon, Tue are empty before day 1

const verifications = [
  { date: "MAY 15", verifier: "Dr. Sarah Chen", note: "Great work on the UI compone..." },
  { date: "MAY 12", verifier: "Dr. Sarah Chen", note: "Integration tests passed verifica..." },
];

export default function LogbookCalendar() {
  const [countdown, setCountdown] = useState({ hours: 47, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) return { hours: 0, minutes: 0, seconds: 0 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const getDayCellClasses = (status: DayStatus) => {
    switch (status) {
      case "verified": return "border-border bg-card";
      case "draft": return "border-border bg-card";
      case "missing": return "border-destructive bg-card";
      case "penalty": return "border-2 border-destructive bg-destructive/5";
      case "today": return "border-primary bg-card";
      default: return "border-border bg-card";
    }
  };

  return (
    <>
      <AppHeader title="Weekly Logbook" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex gap-6">
          {/* Main Calendar Area */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">Monthly Attendance</h2>
                <p className="text-sm text-muted-foreground">Review your internship hours and submission status for May 2024.</p>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
                <ChevronLeft size={16} className="cursor-pointer text-muted-foreground" />
                <span className="font-heading text-sm font-semibold text-foreground">📅 May 2024</span>
                <ChevronRight size={16} className="cursor-pointer text-muted-foreground" />
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 rounded-lg border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Activity Calendar</h3>
                  <p className="text-xs text-muted-foreground">Click a day to edit or view full logs</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-success" /> Verified</span>
                  <span className="flex items-center gap-1"><FileText size={12} /> Draft</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" /> Missing</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 text-center">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <div key={d} className="border-b border-border py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d}</div>
                ))}
                {/* Start padding */}
                {Array.from({ length: startPadding }).map((_, i) => (
                  <div key={`pad-${i}`} className="min-h-[90px] border border-border bg-background" />
                ))}
                {/* Days */}
                {calendarData.map((day) => (
                  <div key={day.day} className={`min-h-[90px] cursor-pointer border p-2 text-left transition-colors hover:bg-muted/50 ${getDayCellClasses(day.status)}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${day.status === "today" ? "text-primary" : "text-foreground"}`}>
                        {day.day}
                        {day.status === "today" && <span className="ml-1 text-[10px] font-bold text-primary">TODAY</span>}
                      </span>
                      <div className="flex gap-0.5">
                        {day.status === "verified" && <ShieldCheck size={12} className="text-success" />}
                        {day.status === "draft" && <FileText size={12} className="text-muted-foreground" />}
                      </div>
                    </div>
                    {day.hours && (
                      <div className="mt-1">
                        <p className="text-xs font-semibold text-foreground">{day.hours} Hours</p>
                        {day.task && <p className="truncate text-[10px] text-muted-foreground">{day.task}</p>}
                      </div>
                    )}
                    {day.status === "penalty" && (
                      <div className="mt-2">
                        <span className="text-[10px] font-bold uppercase text-destructive">Penalty Risk</span>
                        <AlertTriangle size={12} className="mt-0.5 text-destructive" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verification History */}
            <div className="mt-6">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                <Clock size={16} />
                Verification History
              </h3>
              <div className="mt-3 flex gap-4">
                {verifications.map((v) => (
                  <div key={v.date} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <ShieldCheck size={16} className="mt-0.5 text-success" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">{v.date}</p>
                      <p className="text-sm font-medium text-foreground">Verified by {v.verifier}</p>
                      <p className="text-xs text-muted-foreground italic">"{v.note}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 shrink-0 space-y-4">
            {/* Submission Window */}
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground">
                  <Clock size={14} />
                  Submission Window
                </h3>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Deadline for Friday, May 19th</p>
              <div className="mt-3 rounded-md bg-muted p-4 text-center">
                <p className="font-heading text-3xl font-bold text-foreground">
                  {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Hours : Minutes : Seconds</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Draft Progress</span>
                <span>85% Complete</span>
              </div>
              <Progress value={85} className="mt-1 h-2" />
              <Button className="mt-3 w-full" variant="success">Submit Final Log</Button>
            </div>

            {/* Internship Progress */}
            <div className="rounded-lg bg-sidebar p-5 text-sidebar-foreground">
              <div className="flex items-center gap-2">
                <Award size={16} />
                <h3 className="font-heading text-sm font-semibold">Internship Progress</h3>
              </div>
              <p className="mt-3 font-heading text-4xl font-bold">428 <span className="text-lg text-sidebar-foreground/60">/ 500</span></p>
              <p className="text-xs text-sidebar-foreground/60">Total Hours Logged</p>
              <Badge variant="outline" className="mt-1 border-sidebar-border text-sidebar-foreground">Rank: Platinum</Badge>
              <div className="mt-3 flex items-center justify-between text-xs text-sidebar-foreground/60">
                <span>85% Completed</span>
                <span>72h Remaining</span>
              </div>
              <Progress value={85} className="mt-1 h-2" />
              <Button variant="outline" size="sm" className="mt-3 w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                View Milestone Map
              </Button>
            </div>

            {/* Quick Guidelines */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground">
                <Info size={14} />
                Quick Guidelines
              </h3>
              <ol className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-[10px] font-bold text-foreground">1</span> Draft entries must be finalized within 48 hours of the activity.</li>
                <li className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-[10px] font-bold text-foreground">2</span> Ensure your supervisor is tagged for electronic stamping.</li>
                <li className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-[10px] font-bold text-foreground">3</span> Red days (Missing) will trigger a notification to your faculty coordinator.</li>
              </ol>
              <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                <Download size={12} />
                Download Compliance Handbook (PDF)
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-8 border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2024 Internova University Management System • Industry-Academic Partnership Program
        </footer>
      </main>
    </>
  );
}
