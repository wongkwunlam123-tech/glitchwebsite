import { MapPin, Mail, Instagram, MessageCircle } from "lucide-react";

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/glitch.polyu?igsh=MTdncnpscDhybWFyOA==" },
  { Icon: MessageCircle, label: "Discord", href: "https://discord.gg/z2msHsw6q" },
  { Icon: Mail, label: "Email", href: "mailto:25030034d@connect.polyu.hk" },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-electric uppercase">Get In Touch</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">CONTACT</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="reveal glass rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-6">GLITCH Robotics</h3>
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground">
                  The Hong Kong Polytechnic University
                </p>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
                  <span className="text-muted-foreground">Hung Hom, Kowloon, Hong Kong</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-electric" />
                  <a href="mailto:25030034d@connect.polyu.hk" className="text-muted-foreground transition-colors hover:text-electric">
                    25030034d@connect.polyu.hk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 shrink-0 text-electric" />
                  <a href="https://discord.gg/z2msHsw6q" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-electric">
                    Join our community
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition hover:text-electric hover:glow-primary"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="reveal glass relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-grid">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
            <div className="relative flex flex-col items-center gap-4">
              <span className="animate-pulse-glow flex h-8 w-8 items-center justify-center rounded-full bg-primary glow-primary">
                <span className="h-3 w-3 rounded-full bg-primary-foreground" />
              </span>
              <span className="glass rounded-full px-5 py-2 font-mono text-sm text-electric">
                PolyU Campus, Hung Hom
              </span>
              <p className="text-xs text-muted-foreground text-center max-w-xs">
                The Hong Kong Polytechnic University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
