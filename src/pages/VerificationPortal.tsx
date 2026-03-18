import AppHeader from "@/components/layout/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Globe, MapPin, ShieldCheck, Mail, Phone, ZoomIn, ZoomOut, RotateCw, Download, ExternalLink, XCircle, MailOpen } from "lucide-react";

export default function VerificationPortal() {
  return (
    <>
      <AppHeader title="Organization Verification" />
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Pane - Entity Details */}
          <div className="w-full lg:w-[420px] lg:shrink-0 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border bg-card p-4 sm:p-6">
            {/* Company Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                <Building size={20} className="text-muted-foreground sm:size-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground">Quantum Dynamics Ltd.</h2>
                  <Badge variant="muted" className="text-xs flex-shrink-0">Pending</Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe size={12} />  quantum-dynamics.ai
                </p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin size={12} /> Silicon Harbor, Sector 7, Tech City
                </p>
              </div>
            </div>

            {/* Legal & Tax Info */}
            <div className="mt-6">
              <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground">
                <ShieldCheck size={14} />
                Legal & Tax Information
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Business ID</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">QD-992831-2024</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Tax ID / VAT</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">VAT-7722-1100-XX</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Entity Type</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">Private Limited</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Founded Date</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">Oct 12, 2012</p>
                </div>
              </div>
            </div>

            {/* Primary Representative */}
            <div className="mt-6">
              <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground">
                <Building size={14} />
                Primary Representative
              </h3>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground flex-shrink-0">SJ</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">Sarah Jenkins</p>
                  <p className="text-xs text-muted-foreground">HR Director & Talent Acquisition</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <p className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground break-all">
                  <Mail size={14} className="flex-shrink-0" /> s.jenkins@quantum-dynamics.ai
                </p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <Phone size={14} className="flex-shrink-0" /> +1 (555) 902-3344
                </p>
              </div>
            </div>

            {/* Partnership Intent */}
            <div className="mt-6">
              <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground">
                <ShieldCheck size={14} />
                Partnership Intent
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Organization is requesting "Verified Partner" status to offer 15+ engineering internships per semester. They have indicated commitment to the University's standard stipend guidelines.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border p-3 text-center">
                  <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">15</p>
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Slots Planned</p>
                </div>
                <div className="rounded-md border border-border p-3 text-center">
                  <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">3</p>
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Depts Covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane - Document Viewer */}
          <div className="flex flex-1 flex-col bg-background">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary">DOC_INC_2024_041.pdf</span>
                <span className="text-xs text-muted-foreground">842 KB • 1 Page</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><ZoomIn size={16} /></Button>
                <Button variant="ghost" size="icon"><ZoomOut size={16} /></Button>
                <span className="px-2 text-xs text-muted-foreground">100%</span>
                <Button variant="ghost" size="icon"><RotateCw size={16} /></Button>
                <Button variant="ghost" size="icon"><Download size={16} /></Button>
              </div>
            </div>

            {/* Document Preview */}
            <div className="flex flex-1 items-center justify-center overflow-auto p-8">
              <div className="w-full max-w-lg rounded-sm border border-border bg-card p-12">
                <div className="text-center">
                  <p className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground">Certificate of</p>
                  <p className="mt-1 font-heading text-2xl font-bold uppercase tracking-wider text-foreground">Incorporation</p>
                  <div className="mx-auto mt-2 h-0.5 w-16 bg-primary" />
                </div>
                <p className="mt-6 text-center text-sm italic text-muted-foreground">
                  This is to certify that pursuant to the provisions of the Companies Act
                </p>
                <p className="mt-4 text-center text-sm text-muted-foreground">That the organization known as</p>
                <p className="mt-4 text-center font-heading text-lg font-bold uppercase underline underline-offset-4 text-foreground">
                  Quantum Dynamics Ltd.
                </p>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Company Number</p>
                    <p className="mt-1 border-b border-border pb-2 text-sm text-foreground">04299100-INC-X71</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Registered Address</p>
                    <p className="mt-1 border-b border-border pb-2 text-sm text-foreground">Floor 12, Quantum Tower, Industrial Park South, 8821101</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nature of Business</p>
                    <p className="mt-1 border-b border-border pb-2 text-sm italic text-foreground">
                      Specialized Technology Services, Artificial Intelligence Research & Development, Advanced Computing Solutions.
                    </p>
                  </div>
                </div>
                <p className="mt-8 text-xs text-muted-foreground">
                  GIVEN under my hand at the National Registry of Companies, on this twelfth day of October, Two Thousand and Twelve.
                </p>
                <div className="mt-8 text-right">
                  <p className="font-heading text-lg italic text-muted-foreground">J. P. Morgan</p>
                  <div className="ml-auto mt-1 h-px w-32 bg-border" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Registrar of Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="flex items-center justify-between border-t border-border bg-card px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Action Required: Verify Legal Status</span>
            <button className="flex items-center gap-1 text-sm font-medium text-primary">
              <ExternalLink size={14} />
              View Full Profile
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="destructive-ghost">
              <XCircle size={14} />
              Reject Entity
            </Button>
            <Button variant="outline">
              <MailOpen size={14} />
              Request Info
            </Button>
            <Button variant="success">
              <ShieldCheck size={14} />
              Verify Organization
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
