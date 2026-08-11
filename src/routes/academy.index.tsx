import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Wrench, BookOpen, ArrowRight, Code, Cog, FileText, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/academy/")({
  component: AcademyHomePage,
});

const SECTIONS = [
  {
    icon: Cpu,
    title: "Programming",
    description: "Master PROS/C++ development, PID control, sensor fusion, and autonomous programming for VEX U robots.",
    href: "/academy/programming",
    color: "from-green-500 to-emerald-500",
    floatingIcon: Code,
  },
  {
    icon: Wrench,
    title: "Mechanical",
    description: "Learn CAD design, drivetrain engineering, mechanism prototyping, and manufacturing techniques.",
    href: "/academy/mechanical",
    color: "from-blue-500 to-cyan-500",
    floatingIcon: Cog,
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Access official VEX documentation, team training materials, and archived reference designs.",
    href: "/academy/resources",
    color: "from-purple-500 to-pink-500",
    floatingIcon: FileText,
  },
];

function AcademyHomePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 relative z-10">
      {/* Fixed background layer for academy */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Book/document icons with page-flip effect */}
        <div className="absolute top-[15%] left-[10%] opacity-10" style={{ animation: 'organic-float-1 20s ease-in-out infinite' }}>
          <FileText className="h-16 w-16 text-primary" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-[20%] right-[15%] opacity-8" style={{ animation: 'organic-float-2 24s ease-in-out infinite', animationDelay: '-8s' }}>
          <BookOpen className="h-20 w-20 text-accent" strokeWidth={0.5} />
        </div>
        <div className="absolute top-[60%] left-[20%] opacity-10" style={{ animation: 'organic-float-3 22s ease-in-out infinite', animationDelay: '-12s' }}>
          <FileText className="h-14 w-14 text-electric" strokeWidth={0.5} />
        </div>

        {/* Layer 2: Code bracket decorations floating */}
        <div className="absolute top-[25%] right-[25%] opacity-15 font-mono text-6xl text-primary" style={{ animation: 'wave-drift 18s ease-in-out infinite' }}>
          &lt;
        </div>
        <div className="absolute bottom-[30%] left-[30%] opacity-15 font-mono text-6xl text-accent" style={{ animation: 'wave-drift 20s ease-in-out infinite', animationDirection: 'reverse' }}>
          &gt;
        </div>
        <div className="absolute top-[45%] right-[10%] opacity-12 font-mono text-5xl text-electric" style={{ animation: 'organic-float-1 16s ease-in-out infinite', animationDelay: '-5s' }}>
          {'{ }'}
        </div>

        {/* Layer 3: Gear/mechanical elements */}
        <div className="absolute top-[10%] right-[5%] opacity-10" style={{ animation: 'spin-slow 30s linear infinite' }}>
          <Cog className="h-24 w-24 text-primary" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-[15%] left-[5%] opacity-8" style={{ animation: 'spin-slow 25s linear infinite', animationDirection: 'reverse' }}>
          <Cog className="h-20 w-20 text-accent" strokeWidth={0.5} />
        </div>
        <div className="absolute top-[70%] right-[30%] opacity-10" style={{ animation: 'spin-slow 35s linear infinite', animationDelay: '-10s' }}>
          <Wrench className="h-16 w-16 text-electric" strokeWidth={0.5} />
        </div>

        {/* Layer 4: Learning path arrows */}
        <div className="absolute top-[35%] left-[5%] opacity-12" style={{ animation: 'organic-float-2 19s ease-in-out infinite' }}>
          <ArrowRight className="h-12 w-12 text-primary rotate-45" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-[25%] right-[5%] opacity-10" style={{ animation: 'organic-float-3 21s ease-in-out infinite', animationDelay: '-7s' }}>
          <ArrowRight className="h-10 w-10 text-accent -rotate-45" strokeWidth={0.5} />
        </div>
        <div className="absolute top-[50%] left-[40%] opacity-8" style={{ animation: 'wave-drift 17s ease-in-out infinite', animationDelay: '-4s' }}>
          <ArrowRight className="h-8 w-8 text-electric rotate-12" strokeWidth={0.5} />
        </div>
      </div>
      <div className="reveal mb-14 text-center">
        <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">ACADEMY</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          LEARNING <span className="text-gradient">HUB</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Comprehensive training resources for GLITCH Robotics team members, covering programming, mechanical design, and essential references.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-14">
        {SECTIONS.map((section, i) => (
          <a
            key={section.href}
            href={section.href}
            className="reveal glass rounded-2xl p-8 hover-lift group block relative overflow-hidden transition-all duration-300 hover:border-primary/50 cursor-pointer"
            data-reveal-delay={String(i * 100)}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Floating icon decoration */}
            <div className="absolute top-4 right-4 opacity-20 animate-float-slow" style={{ animationDelay: `${i * 0.5}s` }}>
              <section.floatingIcon className="h-8 w-8 text-primary" strokeWidth={1} />
            </div>

            <div className="relative">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <section.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>

              <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-electric transition-colors duration-300">
                {section.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {section.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:text-electric transition-colors duration-300">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Join Discord CTA */}
      <div className="reveal glass rounded-2xl p-8 text-center">
        <h3 className="font-display text-xl font-semibold mb-3">Join Our Learning Community</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Connect with fellow team members, share resources, and get help from experienced mentors.
        </p>
        <a
          href="https://discord.gg/glitch-robotics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 btn-gradient-animated rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="h-4 w-4" />
          Join Discord
        </a>
      </div>
    </section>
  );
}
