import { Link } from "@tanstack/react-router";
import { MapPin, Mail } from "lucide-react";
import { MessageCircle } from "lucide-react";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/about" },
  { label: "Robot", href: "/robot" },
  { label: "Academy", href: "/academy/programming" },
  { label: "News", href: "/" },
  { label: "Partners", href: "/sponsors" },
  { label: "Join", href: "/join" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/80 backdrop-blur-sm border-t border-primary/40 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-2">
        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold tracking-wider text-electric uppercase mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-foreground/90 hover:text-electric transition-colors inline-block py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold tracking-wider text-electric uppercase mb-4">Contact</h4>
          <div className="space-y-3">
            <p className="flex items-start gap-3 text-sm text-foreground/90">
              <MapPin size={16} className="mt-0.5 shrink-0 text-electric" />
              <span>The Hong Kong Polytechnic University, Hung Hom, Kowloon, Hong Kong</span>
            </p>
            <p className="flex items-center gap-3 text-sm text-foreground/90">
              <Mail size={16} className="shrink-0 text-electric" />
              <span>25030034d@connect.polyu.hk</span>
            </p>
          </div>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-sm font-bold tracking-wider text-electric uppercase mb-4">Community</h4>
          <a
            href="https://discord.gg/z2msHsw6q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl border-2 border-white/20"
          >
            <MessageCircle size={18} />
            <span>Join Discord</span>
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-primary/20 px-6 py-3">
        <p className="text-xs text-foreground/50 text-center leading-relaxed max-w-4xl mx-auto">
          This is the official website of GLITCH Robotics, The Hong Kong Polytechnic University VEX U Team.
        </p>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary/20 py-4 text-center">
        <p className="text-xs text-foreground/70 font-mono">
          © 2026 GLITCH Robotics — The Hong Kong Polytechnic University VEX U Team
        </p>
      </div>
    </footer>
  );
}
