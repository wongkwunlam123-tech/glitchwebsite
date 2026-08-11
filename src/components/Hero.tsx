import { useState, useEffect } from "react";
import { BadgeCheck, Handshake, ArrowRight } from "lucide-react";

const STATS = [
  { label: "Founded", value: 2026, suffix: "" },
  { label: "Members", value: 18, suffix: "+" },
  { label: "VEX Awards", value: 6, suffix: "" },
  { label: "Target", value: 2027, suffix: "'27" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(update);
  }, [target]);

  return <>{count}{suffix}</>;
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid">

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        <div className="max-w-2xl">
          <div className="reveal glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <BadgeCheck className="h-3.5 w-3.5 text-electric" />
            VEX U · The Hong Kong Polytechnic University
          </div>

          <h1 className="reveal mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight flex items-baseline gap-4" data-reveal-delay="80">
            <span
              className="glitch-text relative inline-block"
              data-text="GLITCH"
            >
              GLITCH
            </span>{" "}
            <span className="text-foreground">Robotics</span>
          </h1>

          <p className="reveal mt-4 text-base md:text-lg text-muted-foreground" data-reveal-delay="140">
            The Hong Kong Polytechnic University — Official VEX U Robotics Team
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-4" data-reveal-delay="260">
            <a
              href="#sponsors"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:glow-primary"
            >
              <Handshake className="h-4 w-4" />
              Become a Partner
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Join the Team
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="glass inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Explore Our Journey
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* stats */}
        <div className="reveal mt-16 grid grid-cols-2 gap-4 md:grid-cols-4" data-reveal-delay="340">
          {STATS.map((s) => (
            <div key={s.label} className="tech-border hex-pattern rounded-md px-5 py-4 hover-lift">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-mono text-2xl md:text-3xl font-semibold text-electric">
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </p>
            </div>
          ))}
        </div>
        <p className="reveal mt-4 text-xs text-muted-foreground font-mono" data-reveal-delay="400">
          ▸ Target: VEX U World Championship 2027
        </p>
      </div>
    </section>
  );
}
