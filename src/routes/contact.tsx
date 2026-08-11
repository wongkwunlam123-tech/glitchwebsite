import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import { Mail, MapPin, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: "Email",
    value: "25030034d@connect.polyu.hk",
    href: "mailto:25030034d@connect.polyu.hk",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "The Hong Kong Polytechnic University",
    href: "https://www.polyu.edu.hk",
  },
  {
    Icon: MessageCircle,
    label: "Discord",
    value: "Join our community",
    href: "https://discord.gg/z2msHsw6q",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    value: "@glitch.polyu",
    href: "https://www.instagram.com/glitch.polyu?igsh=MTdncnpscDhybWFyOA==",
  },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="contact" minimal />

      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <section className="mx-auto max-w-5xl px-6">
          <div className="reveal mb-8">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">GET IN TOUCH</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              <span className="text-gradient">CONTACT</span> US
            </h1>
          </div>

          <div className="max-w-2xl">
            {/* Contact Info */}
            <div className="reveal glass rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold mb-6">Connect With Us</h3>
              <div className="space-y-5">
                {CONTACT_INFO.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="h-10 w-10 rounded-lg glass flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/30">
                      <c.Icon className="h-5 w-5 text-primary transition-colors group-hover:text-electric" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-electric transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="reveal glass rounded-2xl p-8 mt-6" data-reveal-delay="100">
              <h3 className="font-display text-xl font-semibold mb-4">PolyU Information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                GLITCH Robotics operates under The Hong Kong Polytechnic University and welcomes collaboration opportunities in sponsorship, engineering outreach, and recruitment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
