import { BookOpen, Radar, Blocks, Cog, Code2, Trophy, type LucideIcon } from "lucide-react";
import type { AcademyTopic } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  basics: BookOpen,
  sensors: Radar,
  structure: Blocks,
  mech: Cog,
  prog: Code2,
  comp: Trophy,
};

const TOPICS: (AcademyTopic & { icon: keyof typeof ICONS; desc: string })[] = [
  {
    icon: "basics",
    category: "VEX Hardware Fundamentals",
    desc: "Core components and system architecture for competitive robotics.",
    topics: ["Robot Brain", "Controllers", "Motors & Gearboxes", "Battery Systems"],
  },
  {
    icon: "sensors",
    category: "Sensor Integration",
    desc: "Real-time perception and feedback systems for autonomous operation.",
    topics: ["GPS Navigation", "Optical Sensors", "Distance Measurement", "Rotation Encoders", "Inertial Measurement", "Vision Processing"],
  },
  {
    icon: "structure",
    category: "Mechanical Structures",
    desc: "Building robust frames and power transmission systems.",
    topics: ["Aluminium C-Channels", "Structural Plates", "Shafts & Couplers", "Bearings", "Gears & Sprockets", "Chain Drives", "Wheel Selection"],
  },
  {
    icon: "mech",
    category: "Mechanical Design Principles",
    desc: "Engineering physics applied to robot performance optimization.",
    topics: ["Center of Gravity", "Torque Calculations", "Power Transmission Efficiency", "Friction Management", "Load Distribution"],
  },
  {
    icon: "prog",
    category: "Programming & Control",
    desc: "Software architecture for precise motion and autonomous routines.",
    topics: ["C++ Programming", "PROS Framework", "PID Control Loops", "Odometry Tracking", "Pure Pursuit Pathing", "Sensor Fusion Algorithms"],
  },
  {
    icon: "comp",
    category: "Competition Strategy",
    desc: "From engineering documentation to match-day execution.",
    topics: ["Engineering Notebook", "Match Analysis", "Judging Criteria", "Robot Inspection Prep", "Safety Protocols"],
  },
];

export default function Academy() {
  return (
    <section id="academy" className="section-pad relative bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-electric uppercase mb-3">Knowledge Platform</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            GLITCH <span className="text-gradient">ACADEMY</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Teaching new members and sharing robotics expertise — from hardware fundamentals to advanced autonomous algorithms.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => {
            const Icon = ICONS[t.icon];
            return (
              <div
                key={t.category}
                className="reveal glass rounded-2xl p-7 transition-all duration-300 hover-lift group cursor-pointer"
                data-reveal-delay={String(i * 80)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{t.category}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
