import { Calendar, Users, CheckCircle2, Clock, CheckSquare } from "lucide-react";
import type { RecruitmentPhase } from "@/types";

const PHASES: RecruitmentPhase[] = [
  {
    phase: "Campus Promotion",
    time: "September 2026",
    activities: ["Campus roadshow", "Open day demonstrations", "Info sessions"],
    status: "upcoming",
  },
  {
    phase: "Application Period",
    time: "October 2026",
    activities: ["Online application", "Department selection", "Interest survey"],
    status: "upcoming",
  },
  {
    phase: "Selection Process",
    time: "November 2026",
    activities: ["Interviews", "Skills assessment", "Team fit evaluation"],
    status: "upcoming",
  },
  {
    phase: "Training & Onboarding",
    time: "December 2026 - January 2027",
    activities: ["Basic skills training", "Team building", "VEX rules study"],
    status: "upcoming",
  },
  {
    phase: "Season Preparation",
    time: "February - April 2027",
    activities: ["Robot construction", "Strategy development", "Practice matches"],
    status: "upcoming",
  },
];

const statusConfig = {
  upcoming: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted/20", ringColor: "border-muted-foreground/30" },
  active: { icon: Calendar, color: "text-electric", bg: "bg-electric/10", ringColor: "border-electric" },
  completed: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", ringColor: "border-primary" },
};

export default function RecruitmentTimeline() {
  return (
    <section id="recruitment" className="section-pad pt-[150px]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="reveal mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase">Join Us</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">
            Recruitment <span className="text-gradient">Timeline</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our structured recruitment process ensures the right fit for both you and the team.
          </p>
        </div>

        <div className="relative">
          {/* Animated gradient dashed line */}
          <div className="absolute left-8 top-0 bottom-0 w-px overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-primary via-accent to-transparent opacity-30" />
            <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-electric to-transparent animate-flow-line" style={{ backgroundSize: "100% 200%" }} />
          </div>

          <div className="space-y-8">
            {PHASES.map((phase, i) => {
              const config = statusConfig[phase.status];
              const Icon = config.icon;

              return (
                <div
                  key={phase.phase}
                  className="reveal relative pl-20 group"
                  data-reveal-delay={String(i * 100)}
                >
                  {/* Node with pulse ring */}
                  <div className="absolute left-6 top-6">
                    <div
                      className={`relative h-4 w-4 rounded-full ${config.bg} border-2 ${config.ringColor} ${config.color} transition-all duration-300 group-hover:scale-125`}
                    >
                      {/* Pulse halo */}
                      <div className={`absolute inset-0 rounded-full ${config.ringColor} opacity-30 animate-pulse-ring`} style={{ transform: "scale(1.5)" }} />
                      <div className={`absolute inset-0 rounded-full ${config.ringColor} opacity-20 animate-pulse-ring`} style={{ transform: "scale(2)", animationDelay: "0.5s" }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass rounded-xl p-6 hover-lift transition-all duration-300 group-hover:border-primary/40">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold">{phase.phase}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{phase.time}</p>
                      </div>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>

                    <ul className="space-y-2">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckSquare className={`h-3.5 w-3.5 shrink-0 ${config.color.replace('text-', 'text-')}`} />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal mt-12 glass-strong rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-semibold mb-3">Ready to join?</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Applications open in October 2026. Prepare your portfolio and get ready to build the future.
          </p>
          <div className="mb-6 font-mono text-2xl text-electric">
            <span className="inline-block animate-pulse">⏱</span> Next recruitment starts in ~2 months
          </div>
          <a
            href="#recruitment"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-8 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-secondary"
          >
            Learn More About Joining
          </a>
        </div>
      </div>
    </section>
  );
}
