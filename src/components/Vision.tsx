import { Globe } from "lucide-react";
import type { TimelineStep } from "@/types";

const STEPS: TimelineStep[] = [
  { year: "2026", title: "Team Founded", description: "GLITCH Robotics established at PolyU by experienced VEX V5 competitors.", status: "done" },
  { year: "2026", title: "Robot Development", description: "Design, build and iterate our first competitive VEX U robot — GLITCH-01.", status: "active" },
  { year: "2026", title: "Regional Competitions", description: "Compete in Hong Kong and Asia-Pacific regional events to qualify.", status: "upcoming" },
  { year: "2027", title: "VEX U Qualification", description: "Secure qualification through regional performance and skills rankings.", status: "upcoming" },
  { year: "2027", title: "VEX Robotics World Championship", description: "Represent PolyU on the world stage at VEX Worlds.", status: "upcoming" },
];

export default function Vision() {
  return (
    <section id="vision" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">OUR VISION</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            The Road <span className="text-gradient">Ahead</span>
          </h2>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-primary via-accent to-border" />
          <div className="space-y-10">
            {STEPS.map((s, i) => (
              <div key={s.title} className="reveal relative" data-reveal-delay={String(i * 100)}>
                <span
                  className={`absolute -left-10 top-1.5 h-4 w-4 rounded-full border-2 ${
                    s.status === "done"
                      ? "bg-primary border-primary"
                      : s.status === "active"
                        ? "bg-accent border-accent animate-pulse-glow relative"
                        : "bg-background border-border"
                  }`}
                >
                  {s.status === "active" && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                  )}
                </span>
                <p className="font-mono text-xs text-electric tracking-widest">{s.year}</p>
                <h3 className="font-display text-xl font-semibold mt-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-14 rounded-2xl p-[1px] bg-gradient-to-r from-primary to-accent relative overflow-hidden" data-reveal-delay="200">
          <div className="animate-shimmer absolute inset-0 pointer-events-none" />
          <div className="flex items-center gap-4 rounded-2xl bg-card px-7 py-6 relative z-10">
            <Globe className="h-8 w-8 shrink-0 text-electric" />
            <p className="font-display text-lg md:text-xl font-semibold">
              Long-term Vision: <span className="text-gradient">Become one of Asia's leading university robotics teams.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
