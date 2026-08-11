import {
  DraftingCompass,
  Factory,
  Wrench,
  FlaskConical,
  SlidersHorizontal,
  Code2,
  Cpu,
  Radar,
  ScanEye,
  MonitorPlay,
  NotebookPen,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const MECH: { Icon: LucideIcon; label: string }[] = [
  { Icon: DraftingCompass, label: "CAD Design" },
  { Icon: Factory, label: "Manufacturing" },
  { Icon: Wrench, label: "Assembly" },
  { Icon: FlaskConical, label: "Testing" },
  { Icon: SlidersHorizontal, label: "Optimization" },
];

const PROG: { Icon: LucideIcon; label: string }[] = [
  { Icon: Code2, label: "Control Systems" },
  { Icon: Cpu, label: "Autonomous Programming" },
  { Icon: Radar, label: "Sensor Fusion" },
  { Icon: ScanEye, label: "Vision Processing" },
  { Icon: MonitorPlay, label: "Simulation" },
];

function Discipline({ title, items, delay }: { title: string; items: { Icon: LucideIcon; label: string }[]; delay: number }) {
  return (
    <div className="reveal glass rounded-2xl p-8" data-reveal-delay={String(delay)}>
      <h3 className="font-display text-2xl font-semibold mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon size={17} />
            </span>
            <span className="text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Engineering() {
  return (
    <section id="engineering" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal mb-12">
          <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">HOW WE BUILD</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            ENGINEERING <span className="text-gradient">DISCIPLINES</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Discipline title="Mechanical Engineering" items={MECH} delay={0} />
          <Discipline title="Programming" items={PROG} delay={120} />
        </div>

        <div className="reveal mt-8 glass-strong rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6" data-reveal-delay="200">
          <NotebookPen className="h-10 w-10 shrink-0 text-electric" />
          <div className="flex-1">
            <h3 className="font-display text-xl font-semibold">Engineering Notebook</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Every design decision, test result and iteration is documented in our engineering notebook — the backbone of our judging-ready development process.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary">
            Browse Notebook
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
