import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import RecruitmentTimeline from "@/components/RecruitmentTimeline";
import { Users, Cpu, Wrench, BookOpen, ArrowRight, Mail, Calendar } from "lucide-react";

export const Route = createFileRoute("/join")({
  component: JoinPage,
});

const ROLES = [
  { Icon: Cpu, title: "Programming", desc: "C++ / PROS development and autonomous routines." },
  { Icon: Wrench, title: "Mechanical", desc: "CAD design and mechanism prototyping." },
  { Icon: BookOpen, title: "Strategy & Documentation", desc: "Game analysis and engineering notebook." },
];

const TIMELINE = [
  { month: "Aug–Sep", phase: "Recruitment & Onboarding" },
  { month: "Oct–Nov", phase: "Training & Skill Building" },
  { month: "Dec–Jan", phase: "Design & Prototyping" },
  { month: "Feb–Apr", phase: "Competition Season" },
];

function JoinPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="join" minimal />

      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <section className="mx-auto max-w-5xl px-6">
          <div className="reveal mb-8 text-center">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">JOIN US</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              JOIN THE <span className="text-gradient">TEAM</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              GLITCH Robotics welcomes PolyU students passionate about robotics and engineering. No prior experience required.
            </p>
          </div>

          {/* Roles */}
          <div className="reveal mb-8">
            <h2 className="font-display text-2xl font-semibold mb-6 text-center">What We're Looking For</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {ROLES.map((r, i) => (
                <div
                  key={r.title}
                  className="glass rounded-xl p-6 hover-lift group transition-all duration-300"
                  data-reveal-delay={String(i * 80)}
                >
                  <r.Icon className="h-8 w-8 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:text-electric" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal mb-8 glass-strong rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold mb-6 flex items-center justify-center gap-3"><Calendar className="h-6 w-6 text-electric" />Season Timeline</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TIMELINE.map((t, i) => (
                <div key={t.phase} className="relative" data-reveal-delay={String(i * 80)}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-mono text-xs text-electric flex-shrink-0">{i + 1}</span>
                    <span className="font-mono text-xs text-electric">{t.month}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm">{t.phase}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Recruitment Timeline */}
          <RecruitmentTimeline />

          {/* Apply Now CTA */}
          <div className="reveal mt-12 glass-strong rounded-2xl p-8 md:p-10 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Join Us</span>?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Take the first step towards becoming part of GLITCH Robotics. Fill out our application form and we'll get back to you soon.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300 hover:-translate-y-1"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
