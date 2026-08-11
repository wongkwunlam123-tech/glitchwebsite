import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Users, Target, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about/")({
  component: AboutHomePage,
});

const SECTIONS = [
  {
    icon: Trophy,
    title: "Awards",
    subtitle: "& Achievements",
    description: "Competition results, design awards, and team recognition across VEX U seasons.",
    href: "/about/awards",
    color: "from-yellow-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Our Team",
    subtitle: "Members",
    description: "Meet the engineers, programmers, and strategists behind GLITCH Robotics.",
    href: "/about/team",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Sustainability",
    subtitle: "Roadmap",
    description: "Long-term vision for team growth, knowledge transfer, and competitive excellence.",
    href: "/about/sustainability",
    color: "from-green-500 to-emerald-500",
  },
];

function AboutHomePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 relative z-10">
      <div className="reveal mb-8 text-center">
        <p className="font-mono text-sm tracking-[0.35em] text-electric mb-3 font-semibold">ABOUT US</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          GLITCH <span className="text-gradient">ROBOTICS</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          A student-led VEX U robotics team at The Hong Kong Polytechnic University, committed to engineering excellence and competitive innovation.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {SECTIONS.map((section, i) => (
          <a
            key={section.href}
            href={section.href}
            className="reveal glass rounded-2xl p-8 hover-lift group block relative overflow-hidden transition-all duration-300 hover:border-primary/50 cursor-pointer flex flex-col min-h-[280px]"
            data-reveal-delay={String(i * 100)}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative flex flex-col flex-1">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <section.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>

                <div className="mb-5 min-h-[64px]">
                  <h2 className="font-display text-xl font-semibold group-hover:text-electric transition-colors duration-300 leading-tight">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <h2 className="font-display text-xl font-semibold group-hover:text-electric transition-colors duration-300 leading-tight mt-0.5">
                      {section.subtitle}
                    </h2>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
                  {section.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:text-electric transition-colors duration-300 mt-auto">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
          </a>
        ))}
      </div>
    </section>
  );
}
