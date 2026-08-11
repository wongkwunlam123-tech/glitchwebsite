import { useState } from "react";
import { MapPin, Mail, Instagram, MessageCircle, CheckCircle2 } from "lucide-react";

const DEPARTMENTS = [
  "Mechanical Engineering",
  "Computer Engineering",
  "Electronic Engineering",
  "Artificial Intelligence",
  "Business",
  "Media",
  "Other",
];

const TEAMS = [
  "Leadership",
  "Mechanical",
  "Programming",
  "Electrical",
  "Strategy",
  "Media & Sponsorship",
];

const inputCls =
  "w-full rounded-md bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary transition-all duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_20px_-4px_oklch(0.62_0.22_250_/_40%)]";

export default function JoinContact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="join" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        {/* JOIN */}
        <div className="reveal mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase">Recruitment</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">
            Join <span className="text-gradient">GLITCH</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We welcome students in Mechanical, Computer, Electronic Engineering, AI,
            Manufacturing, Industrial Design, Business, Marketing and Media.
          </p>
          <span className="glass mt-5 inline-block rounded-full px-4 py-1.5 text-xs font-mono text-electric">
            No previous robotics experience required.
          </span>
        </div>

        <div className="reveal glass-strong rounded-2xl p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-electric animate-fade-in-scale" />
              <h3 className="font-display text-2xl font-semibold animate-slide-up">Application Received</h3>
              <p className="text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "100ms" }}>
                Thanks for your interest. Our recruitment team will reach out via your PolyU email.
              </p>
            </div>
          ) : (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">Name</label>
                <input required placeholder="Chan Tai Man" className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">PolyU Email</label>
                <input required type="email" placeholder="taiman.chan@connect.polyu.hk" className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">Department</label>
                <select className={inputCls} defaultValue={DEPARTMENTS[0]}>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d} className="bg-card">{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">Interested Team</label>
                <select className={inputCls} defaultValue={TEAMS[0]}>
                  {TEAMS.map((t) => (
                    <option key={t} value={t} className="bg-card">{t}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm text-muted-foreground">Message</label>
                <textarea rows={4} placeholder="Tell us about yourself and what you'd love to build…" className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 font-display font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>

        {/* CONTACT */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="reveal glass rounded-2xl p-8">
            <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase">Contact</p>
            <h3 className="font-display mt-3 text-3xl font-bold">Get in Touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">GLITCH Robotics — The Hong Kong Polytechnic University</p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
                <span className="text-muted-foreground">
                  The Hong Kong Polytechnic University, Hung Hom, Kowloon, Hong Kong
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-electric" />
                <a href="mailto:25030034d@connect.polyu.hk" className="text-muted-foreground transition-colors hover:text-electric">
                  25030034d@connect.polyu.hk
                </a>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/glitch.polyu?igsh=MTdncnpscDhybWFyOA==", label: "Instagram" },
                { Icon: MessageCircle, href: "https://discord.gg/z2msHsw6q", label: "Discord" },
                { Icon: Mail, href: "mailto:25030034d@connect.polyu.hk", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition hover:text-electric hover:glow-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="reveal glass relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-grid">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
            <div className="relative flex flex-col items-center gap-3">
              <span className="animate-pulse-glow flex h-6 w-6 items-center justify-center rounded-full bg-primary glow-primary">
                <span className="h-2 w-2 rounded-full bg-primary-foreground" />
              </span>
              <span className="glass rounded-full px-4 py-1.5 font-mono text-xs text-electric">
                PolyU Campus, Hung Hom
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
