import { useState } from "react";
import { Cpu, Eye, Navigation, Layers } from "lucide-react";

interface Layer {
  id: string;
  name: string;
  desc: string;
  chips: string[];
}

const LAYERS: Layer[] = [
  { id: "drivetrain", name: "Drivetrain", desc: "6-motor omni-wheel base with direct-drive geometry for precise strafing and rapid repositioning under defense.", chips: ["6-motor drive", "450 RPM", "Omni wheels"] },
  { id: "manipulator", name: "Manipulator", desc: "Dual-stage lift arm with high-torque gearing, tuned for fast cycle times and reliable reach at full extension.", chips: ["2-stage lift", "11W motors", "HS shafts"] },
  { id: "scoring", name: "Scoring Mechanism", desc: "Flywheel-assisted intake and indexer, optimized for consistent throughput across a full match.", chips: ["600 RPM intake", "Roller indexer"] },
  { id: "sensors", name: "Sensor Systems", desc: "Inertial, GPS, optical and rotation sensors fused for real-time pose estimation on the field.", chips: ["IMU + GPS", "Optical", "Rotation x4"] },
  { id: "autonomous", name: "Autonomous Systems", desc: "Odometry-driven pure pursuit with PID motion profiling for repeatable 15-second autonomous routines.", chips: ["Pure pursuit", "PID", "Odometry"] },
];

const AI_FEATURES = [
  {
    icon: Eye,
    name: "Vision Camera",
    description: "Automatically detects game objects and targets using computer vision algorithms for real-time object recognition.",
    technology: "OpenCV + Neural Networks",
    benefit: "Eliminates manual targeting, enables dynamic strategy adjustment",
    maturity: 4,
  },
  {
    icon: Cpu,
    name: "Autonomous Programming",
    description: "Robot moves and scores without driver control through intelligent path planning and decision-making algorithms.",
    technology: "Pure Pursuit + PID Control",
    benefit: "Maximizes autonomous period scoring potential",
    maturity: 5,
  },
  {
    icon: Navigation,
    name: "GPS Sensor",
    description: "Tracks robot position on field for precise navigation and path planning with centimeter-level accuracy.",
    technology: "Triangulation + Kalman Filter",
    benefit: "Enables repeatable autonomous routines and strategic positioning",
    maturity: 4,
  },
  {
    icon: Layers,
    name: "Sensor Fusion",
    description: "Combines data from GPS, gyro, encoders, and camera for accurate real-time decisions and robust state estimation.",
    technology: "Extended Kalman Filter",
    benefit: "Provides reliable performance even when individual sensors fail",
    maturity: 3,
  },
];

export default function Robot() {
  const [active, setActive] = useState<Layer>(LAYERS[0]);
  const [prevId, setPrevId] = useState<string | null>(null);

  const handleSelect = (layer: Layer) => {
    if (active.id !== layer.id) {
      setPrevId(active.id);
      setActive(layer);
    }
  };

  return (
    <section id="robot" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">ENGINEERING SHOWCASE</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            OUR ROBOT — <span className="text-gradient">GLITCH-01</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* exploded view */}
          <div className="reveal relative h-[380px] flex items-center justify-center">
            <div className="absolute inset-0 bg-grid rounded-2xl opacity-60" />
            <div className="relative flex flex-col items-center gap-5">
              {LAYERS.map((layer, i) => (
                <button
                  key={layer.id}
                  onMouseEnter={() => setActive(layer)}
                  onClick={() => handleSelect(layer)}
                  className={`glass rounded-xl transition-all duration-300 animate-float-slow hover:-translate-y-0.5 hover:shadow-lg ${
                    active.id === layer.id ? "border-primary glow-primary scale-105" : "hover:border-primary/50"
                  }`}
                  style={{
                    width: `${110 + i * 28}px`,
                    height: "44px",
                    animationDelay: `${i * 0.6}s`,
                  }}
                  aria-label={layer.name}
                >
                  <span className={`font-mono text-[10px] tracking-widest ${active.id === layer.id ? "text-primary" : "text-muted-foreground"}`}>
                    {layer.name.toUpperCase()}
                  </span>
                </button>
              ))}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between py-6">
                <div className="w-px h-full border-l border-dashed border-primary/20" />
              </div>
            </div>
          </div>

          {/* detail panel */}
          <div
            key={active.id}
            className={`reveal glass-strong rounded-2xl p-8 ${prevId && prevId !== active.id ? "animate-slide-up" : ""}`}
            data-reveal-delay="120"
          >
            <p className="font-mono text-xs tracking-widest text-primary mb-2">SUBSYSTEM</p>
            <h3 className="font-display text-2xl font-semibold mb-3">{active.name}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{active.desc}</p>
            <div className="flex flex-wrap gap-2">
              {active.chips.map((c) => (
                <span key={c} className="glass rounded-full px-3 py-1 font-mono text-xs text-electric">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Integration Section */}
        <div className="reveal mt-16">
          <div className="mb-8">
            <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase mb-3">AI INTEGRATION</p>
            <h3 className="font-display text-3xl font-bold">
              Intelligent <span className="text-gradient">Autonomous Systems</span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Leveraging cutting-edge AI technologies to match real-world robotics practices used by Tesla, NASA, and Google.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {AI_FEATURES.map((feature, i) => (
              <div
                key={feature.name}
                className="reveal glass rounded-xl p-6 hover-lift group relative overflow-hidden"
                data-reveal-delay={String(i * 80)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-electric/20 group-hover:text-electric glow-primary">
                      <feature.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg group-hover:text-electric transition-colors duration-300">
                        {feature.name}
                      </h4>
                      <p className="text-xs font-mono text-primary/70 mt-1">{feature.technology}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-px flex-1 bg-gradient-to-r from-electric/50 to-transparent" />
                    <span className="text-electric font-medium">{feature.benefit}</span>
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
