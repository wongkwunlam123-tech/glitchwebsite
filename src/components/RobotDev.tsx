import { DraftingCompass, Factory, Wrench, Cpu, Radar, FlaskConical, ArrowRight } from "lucide-react";

const MECH = [
  { Icon: DraftingCompass, title: "CAD Development", desc: "Full 3D modeling and simulation of all robot subsystems using industry-standard CAD software." },
  { Icon: Factory, title: "Manufacturing", desc: "Precision machining of custom parts including chassis components, gear systems, and structural elements." },
  { Icon: Wrench, title: "Assembly", desc: "Systematic integration of mechanical, electrical, and software components into a cohesive robotic platform." },
];

const PROG = [
  { Icon: Cpu, title: "Autonomous System", desc: "Advanced path planning and motion control algorithms for repeatable autonomous routines." },
  { Icon: Radar, title: "Sensor Integration", desc: "Multi-sensor fusion combining IMU, GPS, optical, and rotation sensors for real-time feedback." },
  { Icon: FlaskConical, title: "Testing & Optimization", desc: "Rigorous testing protocols and iterative optimization to maximize match performance." },
];

export default function RobotDev() {
  return (
    <section id="robot" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">ENGINEERING PORTFOLIO</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            ROBOT <span className="text-gradient">DEVELOPMENT</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Left: Overview + Mechanical */}
          <div className="lg:col-span-2 space-y-8">
            <div className="reveal glass rounded-2xl p-8">
              <h3 className="font-display text-2xl font-semibold mb-4">Robot Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our VEX U robot is designed from the ground up to excel in competitive matches while demonstrating engineering excellence. Every subsystem — from drivetrain to manipulator — is engineered for reliability, speed, and precision under match pressure.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold mb-5 reveal">Mechanical Design</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {MECH.map((m, i) => (
                  <div key={m.title} className="reveal glass rounded-xl p-5 hover-lift group" data-reveal-delay={String(i * 80)}>
                    <m.Icon className="h-7 w-7 text-primary mb-3 transition-transform group-hover:rotate-12" />
                    <h4 className="font-display font-semibold text-sm mb-2">{m.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold mb-5 reveal">Programming Architecture</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {PROG.map((p, i) => (
                  <div key={p.title} className="reveal glass rounded-xl p-5 hover-lift group" data-reveal-delay={String((i + 3) * 80)}>
                    <p.Icon className="h-7 w-7 text-primary mb-3 transition-transform group-hover:rotate-12" />
                    <h4 className="font-display font-semibold text-sm mb-2">{p.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CAD decoration */}
          <div className="reveal hidden lg:block sticky top-28">
            <div className="glass-strong rounded-2xl p-8 relative overflow-hidden min-h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative">
                {/* CAD wireframe decoration */}
                <div className="w-48 h-48 border-2 border-dashed border-primary/40 rotate-12 animate-spin-slower" style={{ animationDuration: "30s" }} />
                <div className="absolute inset-4 border border-electric/30 -rotate-6" />
                <div className="absolute -inset-2 border border-accent/20 rotate-3" />
              </div>
              <p className="absolute bottom-4 left-4 right-4 text-center text-xs font-mono text-muted-foreground">CAD Render Preview</p>
            </div>
          </div>
        </div>

        {/* Development Timeline */}
        <div className="reveal mt-14 glass rounded-2xl p-8">
          <h3 className="font-display text-xl font-semibold mb-6">Development Timeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { quarter: "2026 Q1", phase: "Research", icon: "🔍" },
              { quarter: "2026 Q2", phase: "Design", icon: "✏️" },
              { quarter: "2026 Q3", phase: "Prototype", icon: "🔧" },
              { quarter: "2026 Q4", phase: "Testing", icon: "⚙️" },
            ].map((item, i) => (
              <div key={item.quarter} className="text-center">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-mono text-xs text-electric mb-1">{item.quarter}</p>
                <p className="font-display font-semibold text-sm">{item.phase}</p>
                {i < 3 && <ArrowRight className="hidden md:block mx-auto mt-2 text-muted-foreground" size={16} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
