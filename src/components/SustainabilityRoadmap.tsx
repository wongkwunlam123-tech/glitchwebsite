import { Target, Users, Globe, Trophy, ArrowRight } from "lucide-react";

const ROADMAP = [
  {
    phase: "Short-Term",
    year: "2025-2026",
    icon: Target,
    goal: "Apply Knowledge in Real Scenarios",
    description: "Use mechanical design, motor control, and programming skills learned in the classroom to real competitive scenarios.",
    metrics: ["Hands-on engineering experience", "Teamwork & problem-solving", "Practice 'Exploring Things to Achieve Tasks'"],
    status: "active" as const,
    texture: "circuit",
    metricColors: ["text-primary", "text-accent", "text-electric"],
  },
  {
    phase: "Medium-Term",
    year: "2026-2027",
    icon: Users,
    goal: "Establish Inheritance System",
    description: "Senior members train new members, pass down technical skills and competition experience.",
    metrics: ["Sustainable team development", "Stable independent structure", "Continuous growth model"],
    status: "upcoming" as const,
    texture: "network",
    metricColors: ["text-primary", "text-accent", "text-electric"],
  },
  {
    phase: "Long-Term",
    year: "2027-2029",
    icon: Globe,
    goal: "Root in VEX Field & Contribute to Society",
    description: "Regular participation in VEX competitions, enhance university reputation, contribute innovative knowledge to society.",
    metrics: ["World Championship presence", "QS ranking improvement", "Benefiting the People ideal"],
    status: "upcoming" as const,
    texture: "globe",
    metricColors: ["text-primary", "text-accent", "text-electric"],
  },
];

const TextureBackground = ({ type }: { type: string }) => {
  if (type === "circuit") {
    return (
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 20 L 15 20 L 15 5 L 25 5 L 25 20 L 40 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="15" cy="20" r="1.5" fill="currentColor" />
            <circle cx="25" cy="20" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
    );
  }
  if (type === "network") {
    return (
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="network" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="2" fill="currentColor" />
            <line x1="25" y1="25" x2="0" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="25" y1="25" x2="50" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="25" y1="25" x2="0" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="25" y1="25" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg width="100%" height="100%">
        <pattern id="globe" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="30" cy="30" rx="15" ry="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="30" y1="15" x2="30" y2="45" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#globe)" />
      </svg>
    </div>
  );
};

export default function SustainabilityRoadmap() {
  return (
    <section className="section-pad pt-[0px] pb-[0px]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase">Vision</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">
            Sustainability <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Building a lasting legacy through continuous innovation, knowledge transfer, and global impact.
          </p>
        </div>

        <div className="relative">
          {/* Connection arrows between cards */}
          <div className="hidden md:block absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
            <ArrowRight className="h-6 w-6 text-primary/40 animate-pulse" />
          </div>
          <div className="hidden md:block absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 z-10">
            <ArrowRight className="h-6 w-6 text-primary/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {ROADMAP.map((item, i) => (
              <div
                key={item.phase}
                className={`reveal glass rounded-2xl p-6 relative overflow-hidden group transition-all duration-500 ${
                  item.status === "active" ? "border-primary/50 glow-primary animate-breathing" : "hover:border-primary/30"
                }`}
                data-reveal-delay={String(i * 100)}
              >
                <TextureBackground type={item.texture} />

                {item.status === "active" && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary border border-primary/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      In Progress
                    </span>
                  </div>
                )}

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      item.status === "active" ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{item.year}</p>
                      <h3 className="font-display text-lg font-semibold">{item.phase}</h3>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">{item.goal}</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-electric">Key Metrics:</p>
                    <ul className="space-y-1.5">
                      {item.metrics.map((metric, idx) => (
                        <li key={metric} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Trophy className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${item.metricColors[idx] || "text-primary/60"}`} />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
