import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import { Calendar, Target, Trophy, Rocket, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/road")({
  component: RoadPage,
});

const MILESTONES = [
  {
    year: "2026",
    title: "Team Establishment",
    desc: "GLITCH Robotics founded at PolyU. Core team assembled with previous VEX V5 experience and award achievements.",
    icon: Rocket,
    status: "completed" as const,
  },
  {
    year: "2026-2027",
    title: "VEX U Season",
    desc: "First competitive season. Robot design, manufacturing, programming, and testing cycles completed.",
    icon: Calendar,
    status: "active" as const,
  },
  {
    year: "2027",
    title: "Regional Qualifiers",
    desc: "Compete in regional VEX U events to earn qualification points for the World Championship.",
    icon: Target,
    status: "upcoming" as const,
  },
  {
    year: "2027",
    title: "World Championship",
    desc: "Goal: Qualify and compete at the VEX U World Championship representing Hong Kong and PolyU.",
    icon: Trophy,
    status: "goal" as const,
  },
];

function RoadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="road" minimal />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <section className="mx-auto max-w-5xl px-6">
          <div className="reveal mb-14">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">OUR JOURNEY</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              ROAD TO <span className="text-gradient">WORLDS</span>
            </h1>
          </div>

          {/* Timeline */}
          <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-primary via-electric to-accent/30 hidden md:block" />

            {MILESTONES.map((m, i) => (
              <div
                key={m.title}
                className="reveal relative flex gap-6 md:gap-10 items-start group"
                data-reveal-delay={String(i * 100)}
              >
                {/* Timeline dot */}
                <div className={`relative z-10 flex-shrink-0 h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  m.status === "completed"
                    ? "border-primary bg-primary/20"
                    : m.status === "active"
                      ? "border-electric bg-electric/20 shadow-[0_0_12px_var(--color-electric)]"
                      : m.status === "goal"
                        ? "border-accent bg-accent/10"
                        : "border-muted-foreground/30 bg-background"
                }`}>
                  {m.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <m.icon className={`h-5 w-5 ${
                      m.status === "active" ? "text-electric" : m.status === "goal" ? "text-accent" : "text-muted-foreground"
                    }`} />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 glass rounded-xl p-6 hover-lift transition-all duration-300 group-hover:border-primary/30">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-mono text-xs tracking-wider px-2 py-0.5 rounded ${
                      m.status === "active"
                        ? "bg-electric/20 text-electric"
                        : m.status === "goal"
                          ? "bg-accent/20 text-accent"
                          : "bg-secondary text-muted-foreground"
                    }`}>
                      {m.year}
                    </span>
                    {m.status === "active" && (
                      <span className="text-xs font-medium text-electric animate-pulse">IN PROGRESS</span>
                    )}
                    {m.status === "goal" && (
                      <span className="text-xs font-medium text-accent">TARGET</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Competition Prep Section */}
          <div className="reveal mt-16 glass-strong rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-2xl font-semibold mb-6">Competition Preparation</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Robot Design", detail: "Iterative CAD development and simulation" },
                { label: "Manufacturing", detail: "Precision machining and 3D printing" },
                { label: "Programming", detail: "Autonomous routines and driver control" },
                { label: "Testing", detail: "Match simulation and performance tuning" },
                { label: "Strategy", detail: "Game analysis and alliance planning" },
                { label: "Documentation", detail: "Engineering notebook and presentations" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="font-display font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="reveal mt-16 text-center">
            <div className="glass-strong rounded-2xl p-10 md:p-14 max-w-3xl mx-auto">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Support Our <span className="text-gradient">Journey</span>
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Help us reach the World Championship. Your support enables innovation, education, and competitive excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-primary-foreground hover-lift transition-all duration-300 hover:shadow-[0_0_20px_var(--color-primary)]"
                >
                  Support Us
                </a>
                <a
                  href="https://www.instagram.com/glitch.polyu?igsh=MTdncnpscDhybWFyOA=="
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-8 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-secondary transition-all duration-300"
                >
                  Follow Progress
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
