import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  Video,
  Globe,
  ArrowRight,
  Presentation,
  NotebookPen,
  FolderArchive,
} from "lucide-react";

export const Route = createFileRoute("/academy/resources")({
  component: ResourcesPage,
});

const OFFICIAL = [
  { Icon: BookOpen, title: "VEX U Game Manual", desc: "Official rules, scoring, and field specifications for the current season.", url: "https://content.vexrobotics.com/docs/2026-2027/override/files/v5rc-override-0.1.2-obs.pdf" },
  { Icon: FileText, title: "VEX Robotics Documentation", desc: "Technical docs for V5 hardware, electronics, and VEXcode APIs.", url: "https://kb.vex.com/" },
  { Icon: Video, title: "VEX Forum", desc: "Community discussions, strategy breakdowns, and match footage.", url: "https://www.vexforum.com/" },
  { Icon: Globe, title: "Global Robotics & Science Foundation", desc: "Event registration, competition calendar, and global rankings.", url: "https://www.globalrobotics.org/" },
];

const MATERIALS = [
  { Icon: Presentation, title: "Internal Training Slides", desc: "Onboarding decks covering team workflow and engineering standards." },
  { Icon: NotebookPen, title: "Engineering Notebook Template", desc: "Standardized template for documenting the design process." },
  { Icon: FolderArchive, title: "Previous CAD Reference Library", desc: "Archived subsystem designs from earlier build cycles." },
];

function ResourcesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="reveal mb-14">
        <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">ACADEMY</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          LEARNING <span className="text-gradient">RESOURCES</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Curated official references and internal team materials to support every member's engineering journey.
        </p>
      </div>

      {/* Official Resources */}
      <div className="mb-14">
        <h2 className="reveal font-display text-2xl font-semibold mb-7">Official Resources</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {OFFICIAL.map((r, i) => (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal glass rounded-xl p-6 hover-lift group block transition-all duration-300 hover:border-primary/50"
              data-reveal-delay={String(i * 80)}
            >
              <r.Icon
                className="h-7 w-7 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-electric"
                strokeWidth={1.5}
              />
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-display font-semibold text-sm">{r.title}</h3>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-electric" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              <p className="text-[10px] text-primary/60 mt-2 font-mono truncate">{r.url}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Team Materials */}
      <div className="reveal glass-strong rounded-2xl p-8" data-reveal-delay="200">
        <h2 className="font-display text-2xl font-semibold mb-6">Team Materials</h2>
        <div className="space-y-5">
          {MATERIALS.map((m, i) => (
            <div
              key={m.title}
              className="reveal flex items-start gap-4"
              data-reveal-delay={String(240 + i * 80)}
            >
              <div className="h-10 w-10 rounded-lg glass flex items-center justify-center flex-shrink-0">
                <m.Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm mb-1">{m.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
