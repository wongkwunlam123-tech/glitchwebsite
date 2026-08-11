import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Robot", href: "/robot" },
  { label: "Road To Worlds", href: "/road" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? "glass-strong" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/glitch-logo.png"
            alt="GLITCH Robotics Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-widest">
              GLITCH
            </span>
            <span className="block text-[10px] font-medium tracking-[0.25em] text-muted-foreground">
              ROBOTICS | PolyU
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className="nav-link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`nav-link-underline text-sm transition-colors ${
              location.pathname.startsWith("/about")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            About
          </Link>

          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="nav-link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}

          <Link
            to="/academy"
            className={`nav-link-underline text-sm transition-colors ${
              location.pathname.startsWith("/academy")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Academy
          </Link>

          <Link
            to="/sponsors"
            className="btn-hover-glow rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Become a Partner
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg glass lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong border-t border-border lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              About
            </Link>

            {LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}

            <Link
              to="/academy"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Academy
            </Link>

            <Link
              to="/sponsors"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
