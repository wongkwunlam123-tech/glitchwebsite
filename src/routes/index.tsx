import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import News from "@/components/News";
import DynamicBackground from "@/components/DynamicBackground";
import CustomCursor from "@/components/CustomCursor";
import { ArrowRight, CheckCircle2, Users, Handshake, Cpu, Trophy, Globe, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <CustomCursor />
      <DynamicBackground />

      <Navbar />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden page-enter">

          {/* VEX U Logo - only visible in first screen, scrolls away */}
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none" style={{ zIndex: 5 }}>
            <img
              src="/vex-u-logo.png"
              alt="VEX U Robotics Competition"
              loading="lazy"
              decoding="async"
              className="h-28 w-auto object-contain mix-blend-screen brightness-125 contrast-110"
              style={{ filter: 'drop-shadow(0 0 20px oklch(0.70 0.22 300 / 0.4))' }}
            />
          </div>

          {/* bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
            <div className="max-w-3xl">
              <div className="reveal glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-electric shrink-0" />
                VEX U · The Hong Kong Polytechnic University
              </div>

              <h1 className="reveal mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight flex items-baseline gap-4" data-reveal-delay="80">
                <span
                  className="glitch-text-enhanced relative inline-block"
                  data-text="GLITCH"
                >
                  GLITCH
                </span>{" "}
                <span className="text-foreground">Robotics</span>
              </h1>

              <p className="reveal mt-4 text-base md:text-lg text-muted-foreground" data-reveal-delay="140">
                Engineering Excellence. Global Ambition.
              </p>

              <p className="reveal mt-5 max-w-xl text-sm md:text-base text-muted-foreground/90" data-reveal-delay="180">
                GLITCH Robotics brings together mechanical design, software engineering, and strategy to build high-performance robots that compete at the highest level.
              </p>

              <div className="reveal mt-8 flex flex-wrap items-center gap-4" data-reveal-delay="260">
                <Link
                  to="/robot"
                  className="btn-gradient-animated hover-scale btn-hover-glow inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200"
                >
                  Our Robot
                  <ArrowRight className="h-4 w-4 icon-rotate-on-hover" />
                </Link>
                <Link
                  to="/join"
                  className="btn-glass-animated hover-scale btn-hover-glow glass inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-200"
                >
                  Join the Team
                  <ArrowRight className="h-4 w-4 icon-rotate-on-hover" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsor Call-to-Action Banner */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="reveal glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-primary/30 relative overflow-hidden group">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-electric/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-electric opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-medium bg-primary/15 text-primary mb-3 sm:mb-4">
                  <Handshake className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="whitespace-nowrap">SPONSORSHIP OPPORTUNITY</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                  Support the Future of <span className="text-gradient">Robotics Engineering</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Partner with GLITCH Robotics to empower student innovation, gain brand exposure at international competitions, and connect with top engineering talent from The Hong Kong Polytechnic University.
                </p>
              </div>
              <Link
                to="/sponsors"
                className="btn-gradient-animated hover-scale btn-hover-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground transition-transform duration-200 shrink-0 whitespace-nowrap mt-2 md:mt-0"
              >
                Become a Sponsor
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 icon-rotate-on-hover" />
              </Link>
            </div>
          </div>
        </section>

        {/* What is VEX U */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="reveal-up glass-strong rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold mb-3">What is VEX U?</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                The premier university-level robotics competition — where students engineer real solutions with professional-grade tools and techniques.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: "2026", label: "Founded at PolyU" },
                { value: "6+", label: "Engineering disciplines" },
                { value: "3", label: "Core team pillars" },
                { value: "1", label: "Shared mission: build smarter" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{item.value}</div>
                  <p className="mt-2 text-xs text-muted-foreground uppercase tracking-[0.15em]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric mb-3">WHY GLITCH</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                We combine rapid prototyping, autonomous systems, and strategic competition thinking to turn ambitious engineering ideas into reliable match-ready machines.
              </p>
            </div>

            {/* Professional Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="glass rounded-xl p-6 card-hover-lift">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/15 shrink-0">
                    <Cpu className="h-6 w-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Custom Robot Design</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Teams design and fabricate two unique robots per season using CNC machining, 3D printing, and advanced materials — no kits, no limits.</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 card-hover-lift">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/15 shrink-0">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Advanced Autonomous Systems</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Program sophisticated autonomous routines with PID control, odometry, sensor fusion, and path planning — matching industry-level complexity.</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 card-hover-lift">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-violet-glow/15 shrink-0">
                    <Globe className="h-6 w-6 text-violet-glow" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Professional CAD Workflow</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Full digital design in Onshape, SolidWorks, or Fusion 360 before manufacturing — every component modeled, tested, and optimized virtually first.</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 card-hover-lift">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-electric/15 shrink-0">
                    <Users className="h-6 w-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Student-Led Engineering</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Students own all decisions: design, programming, budgeting, and sponsorship. Real engineering responsibility with mentor guidance only.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="glass rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <Trophy className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">GLITCH Robotics</p>
                  <p className="text-xs text-muted-foreground">The Hong Kong Polytechnic University</p>
                </div>
              </div>
              <Link
                to="/about"
                className="btn-hover-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* News Section */}
        <News />
      </main>
      <Footer />
    </div>
  );
}
