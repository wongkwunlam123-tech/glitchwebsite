import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import Sponsors from "@/components/Sponsors";
import { Handshake, Globe, Users, Award, ArrowRight, Mail } from "lucide-react";

export const Route = createFileRoute("/sponsors")({
  component: SponsorsPage,
});

const BENEFITS = [
  {
    Icon: Globe,
    title: "Brand Visibility",
    desc: "Showcase your organization on our robot, team assets, and public-facing robotics materials throughout the season.",
  },
  {
    Icon: Users,
    title: "Talent Pipeline",
    desc: "Connect with PolyU students who are building technical skills in engineering, software, design, and strategy.",
  },
  {
    Icon: Award,
    title: "STEM Impact",
    desc: "Support hands-on engineering education and show your commitment to future-ready innovation in Hong Kong.",
  },
  {
    Icon: Handshake,
    title: "Partnership Access",
    desc: "Join our team events, demos, and student engagement opportunities as a valued sponsor partner.",
  },
];

const TIERS = [
  {
    name: "Platinum",
    price: "HK$50,000+",
    perks: ["Primary logo placement on robot", "Full-page feature in engineering notebook", "Speaking opportunity at team events", "Priority recruitment access"],
    highlight: true,
  },
  {
    name: "Gold",
    price: "HK$25,000+",
    perks: ["Secondary logo placement", "Half-page feature in notebook", "Social media recognition package", "Event invitations"],
    highlight: false,
  },
  {
    name: "Silver",
    price: "HK$10,000+",
    perks: ["Logo on team website", "Social media mentions", "Event invitations", "Thank-you certificate"],
    highlight: false,
  },
];

function SponsorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="sponsors" minimal />

      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <section className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-14 text-center">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">PARTNERSHIPS</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              SUPPORT <span className="text-gradient">GLITCH</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Partner with GLITCH Robotics to support the next generation of engineers and gain visibility in the international VEX U robotics community.
            </p>
          </div>

          {/* Why Support */}
          <div className="reveal mb-16">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Why Support GLITCH?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  className="glass rounded-xl p-6 hover-lift group transition-all duration-300"
                  data-reveal-delay={String(i * 80)}
                >
                  <b.Icon className="h-8 w-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-electric" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-sm mb-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center text-sm text-muted-foreground leading-relaxed">
              Sponsoring GLITCH means investing in PolyU engineering talent, hands-on robotics education, and the next generation of students ready to build and compete at a global standard.
            </div>
          </div>

          {/* Sponsorship Tiers */}
          <div className="reveal mb-16">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Sponsorship Tiers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-7 transition-all duration-300 hover-lift ${
                    tier.highlight
                      ? "glass-strong border-primary/40 shadow-[0_0_20px_var(--color-primary-glow)]"
                      : "glass border-border/50"
                  }`}
                  data-reveal-delay={String(i * 100)}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-xs font-bold text-primary-foreground">
                      RECOMMENDED
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
                  <p className="font-mono text-sm text-electric mb-5">{tier.price}</p>
                  <ul className="space-y-3">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Transparency & Sponsorship Tiers from Sponsors component */}
          <Sponsors />

          {/* CTA */}
          <div className="reveal mt-8 glass-strong rounded-2xl p-10 text-center">
            <h2 className="font-display text-2xl font-bold mb-6">Ready to Partner?</h2>
            <Link
              to="/contact"
              className="btn-gradient-animated inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-7 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Mail className="h-4 w-4 icon-rotate-on-hover" />
              Get In Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
