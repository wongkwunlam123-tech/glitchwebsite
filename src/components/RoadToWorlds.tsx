import { MapPin, Calendar } from "lucide-react";
import type { Milestone } from "@/types";

const MILESTONES: Milestone[] = [
  { stage: "Team Formation", progress: 100, status: "done", eta: "Q1 2026" },
  { stage: "Robot Design", progress: 75, status: "active", eta: "Q3 2026" },
  { stage: "Prototype", progress: 40, status: "active", eta: "Q4 2026" },
  { stage: "Programming", progress: 30, status: "active", eta: "Q4 2026" },
  { stage: "Testing", progress: 10, status: "upcoming", eta: "Q1 2027" },
  { stage: "Competition", progress: 0, status: "upcoming", eta: "Q1 2027" },
  { stage: "Qualification", progress: 0, status: "upcoming", eta: "Q2 2027" },
  { stage: "World Championship", progress: 0, status: "upcoming", eta: "2027" },
];

const EVENTS = [
  { name: "Hong Kong Regional Qualifier", date: "Jan 2027", location: "Hong Kong" },
  { name: "Asia-Pacific Invitational", date: "Mar 2027", location: "TBD" },
  { name: "VEX U World Championship", date: "Apr–May 2027", location: "USA" },
];

const STATUS_LABEL: Record<Milestone["status"], string> = {
  done: "Done",
  active: "In Progress",
  upcoming: "Upcoming",
};

export default function RoadToWorlds() {
  return (
    <section id="road" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="reveal mb-12">
          <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">PROGRESS DASHBOARD</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            ROAD TO <span className="text-gradient">WORLDS</span>
          </h2>
          <p className="mt-3 text-muted-foreground">VEX U World Championship 2027</p>
        </div>

        <div className="space-y-5">
          {MILESTONES.map((m, i) => (
            <div key={m.stage} className="reveal group" data-reveal-delay={String(i * 60)}>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-medium transition-colors duration-300 group-hover:text-electric">{m.stage}</span>
                <span className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono transition-all duration-300 ${
                      m.status === "done"
                        ? "bg-primary/15 text-electric group-hover:bg-electric/20"
                        : m.status === "active"
                          ? "bg-accent/15 text-accent group-hover:bg-accent/25"
                          : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    }`}
                  >
                    {STATUS_LABEL[m.status]}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{m.eta}</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 group-hover:brightness-125 ${
                    m.status === "active"
                      ? "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer"
                      : "bg-gradient-to-r from-primary to-accent"
                  }`}
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {EVENTS.map((e, i) => (
            <div key={e.name} className="reveal glass rounded-xl p-5 hover-lift group transition-all duration-300" data-reveal-delay={String(i * 90)}>
              <h3 className="font-display font-semibold transition-colors duration-300 group-hover:text-electric">{e.name}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                <Calendar size={13} className="text-electric transition-transform duration-300 group-hover:scale-110" /> {e.date}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                <MapPin size={13} className="text-electric transition-transform duration-300 group-hover:scale-110" /> {e.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
