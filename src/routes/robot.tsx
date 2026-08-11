import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import Robot from "@/components/Robot";
import { DraftingCompass, Factory, Wrench, Cpu, Radar, FlaskConical, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/robot")({
  component: RobotPage,
});

const MECH = [
  { Icon: DraftingCompass, title: "CAD Development", desc: "Full 3D modeling and simulation." },
  { Icon: Factory, title: "Manufacturing", desc: "Precision machining of custom parts." },
  { Icon: Wrench, title: "Assembly", desc: "Systematic integration of all components." },
];

const PROG = [
  { Icon: Cpu, title: "Autonomous System", desc: "Advanced path planning algorithms." },
  { Icon: Radar, title: "Sensor Integration", desc: "Multi-sensor fusion for real-time feedback." },
  { Icon: FlaskConical, title: "Testing & Optimization", desc: "Rigorous testing protocols." },
];

function RobotPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="robot" minimal />

      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <section className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-8">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">ENGINEERING PORTFOLIO</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              ROBOT <span className="text-gradient">DEVELOPMENT</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Left: Overview + Mechanical */}
            <div className="lg:col-span-2 space-y-8">
              <div className="reveal glass rounded-2xl p-8">
                <h3 className="font-display text-2xl font-semibold mb-4">Robot Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our VEX U robot is engineered for reliability, speed, and precision under match pressure.
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

            {/* Right: CAD decoration with specs */}
            <div className="reveal hidden lg:block sticky top-28">
              <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-40" />

                {/* CAD wireframe decoration */}
                <div className="relative mb-6 flex items-center justify-center h-48">
                  <div className="w-40 h-40 border-2 border-dashed border-primary/40 rounded-lg rotate-12 animate-spin-slower" style={{ animationDuration: "30s" }} />
                  <div className="absolute inset-4 border border-electric/30 rounded-md -rotate-6" />
                  <div className="absolute -inset-2 border border-accent/20 rounded-xl rotate-3" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-primary/30 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary/20 rounded-full" />
                </div>

                {/* Technical specs */}
                <div className="space-y-3">
                  <h4 className="font-display text-sm font-semibold text-electric mb-3">Technical Specifications</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="text-foreground font-medium">~15 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="text-foreground font-medium">18" × 18" × 15"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Motors</span>
                      <span className="text-foreground font-medium">8 V5 Smart</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sensors</span>
                      <span className="text-foreground font-medium">Vision, GPS, IMU</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Controller</span>
                      <span className="text-foreground font-medium">V5 Brain</span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs font-mono text-muted-foreground">CAD Render Preview</p>
              </div>
            </div>
          </div>

          {/* VEX U Super Kit Components */}
          <div className="reveal mt-16">
            <h2 className="font-display text-2xl font-semibold mb-6 text-center">
              VEX U <span className="text-gradient">Super Kit</span> Components
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Our robot is built using the official VEX U Super Kit, providing a comprehensive set of high-quality components for competitive robotics.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "V5 Smart Motor", desc: "High-torque programmable motors with integrated encoders", icon: Cpu },
                { name: "V5 Brain", desc: "Central processing unit with touchscreen interface", icon: Radar },
                { name: "Vision Sensor", desc: "Advanced object detection and tracking capabilities", icon: FlaskConical },
                { name: "GPS Sensor", desc: "Precise position tracking on the competition field", icon: DraftingCompass },
                { name: "IMU Sensor", desc: "Inertial measurement for orientation and balance", icon: Factory },
                { name: "Bumper Switch", desc: "Tactile feedback for collision detection", icon: Wrench },
                { name: "Limit Switch", desc: "Position sensing for mechanism control", icon: ArrowRight },
                { name: "Potentiometer", desc: "Angular position measurement for joints", icon: DraftingCompass },
              ].map((component, i) => (
                <div
                  key={component.name}
                  className="reveal glass rounded-xl p-6 hover-lift group transition-all duration-300 hover:border-primary/40"
                  data-reveal-delay={String(i * 60)}
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <component.icon className="h-6 w-6 text-primary group-hover:text-electric transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">{component.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{component.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Integration & Robot Details from Robot component */}
          <Robot />
        </section>
      </main>
      <Footer />
    </div>
  );
}
