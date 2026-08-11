import { useEffect, useState } from "react";

interface DynamicBackgroundProps {
  enableParallax?: boolean;
  parallaxImage?: string;
  variant?: 'default' | 'robot' | 'academy' | 'about' | 'gallery' | 'contact' | 'road' | 'sponsors' | 'join';
  minimal?: boolean; // For sub-pages: only gradient + orbs, no geometric shapes
}

// Different background configurations for each page (only gradient, noise, hex, circuit, flow lines remain)
const VARIANT_CONFIGS = {
  default: {
    gradientOpacity: '/4',
    noiseOpacity: 0.008,
    hexOpacity: 0.015,
    circuitOpacity: 0.025,
    flowLineOpacity: '/20',
    scanBeamOpacity: '/5',
  },
  robot: {
    gradientOpacity: '/5',
    noiseOpacity: 0.01,
    hexOpacity: 0.018,
    circuitOpacity: 0.03,
    flowLineOpacity: '/25',
    scanBeamOpacity: '/6',
  },
  academy: {
    gradientOpacity: '/3',
    noiseOpacity: 0.006,
    hexOpacity: 0.012,
    circuitOpacity: 0.02,
    flowLineOpacity: '/15',
    scanBeamOpacity: '/4',
  },
  about: {
    gradientOpacity: '/4',
    noiseOpacity: 0.009,
    hexOpacity: 0.016,
    circuitOpacity: 0.028,
    flowLineOpacity: '/22',
    scanBeamOpacity: '/5',
  },
  gallery: {
    gradientOpacity: '/5',
    noiseOpacity: 0.012,
    hexOpacity: 0.02,
    circuitOpacity: 0.032,
    flowLineOpacity: '/28',
    scanBeamOpacity: '/7',
  },
  contact: {
    gradientOpacity: '/3',
    noiseOpacity: 0.007,
    hexOpacity: 0.013,
    circuitOpacity: 0.022,
    flowLineOpacity: '/18',
    scanBeamOpacity: '/4',
  },
  road: {
    gradientOpacity: '/4',
    noiseOpacity: 0.01,
    hexOpacity: 0.017,
    circuitOpacity: 0.027,
    flowLineOpacity: '/23',
    scanBeamOpacity: '/6',
  },
  sponsors: {
    gradientOpacity: '/5',
    noiseOpacity: 0.011,
    hexOpacity: 0.019,
    circuitOpacity: 0.03,
    flowLineOpacity: '/26',
    scanBeamOpacity: '/6',
  },
  join: {
    gradientOpacity: '/4',
    noiseOpacity: 0.009,
    hexOpacity: 0.016,
    circuitOpacity: 0.026,
    flowLineOpacity: '/22',
    scanBeamOpacity: '/5',
  },
};

export default function DynamicBackground({ 
  enableParallax = false, 
  parallaxImage,
  variant = 'default',
  minimal = false
}: DynamicBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const config = VARIANT_CONFIGS[variant];

  useEffect(() => {
    if (!enableParallax) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / window.innerWidth * 15;
      const deltaY = (e.clientY - centerY) / window.innerHeight * 15;
      setMousePos({ x: deltaX, y: deltaY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableParallax]);

  // Minimal mode: only gradient mesh, no geometric shapes or orbs
  if (minimal) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Layer 1: Gradient mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-primary/2 via-transparent to-accent/2 animate-gradient-mesh-1 animate-color-flow-1`} />
          <div className={`absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-to-bl from-accent/2 via-transparent to-electric/2 animate-gradient-mesh-2 animate-color-flow-2`} />
          <div className={`absolute -bottom-1/2 left-1/4 w-[150%] h-[150%] bg-gradient-to-t from-violet-glow/2 via-transparent to-primary/2 animate-gradient-mesh-3 animate-color-flow-3`} />
        </div>
      </div>
    );
  }

  // Full mode: all 13 layers
  return (
    <>
      {/* Fixed background layer - stays during scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Layer 1: Professional gradient mesh with continuous color flow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-primary${config.gradientOpacity} via-transparent to-accent${config.gradientOpacity} animate-gradient-mesh-1 animate-color-flow-1`} />
          <div className={`absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-to-bl from-accent${config.gradientOpacity} via-transparent to-electric${config.gradientOpacity} animate-gradient-mesh-2 animate-color-flow-2`} />
          <div className={`absolute -bottom-1/2 left-1/4 w-[150%] h-[150%] bg-gradient-to-t from-violet-glow${config.gradientOpacity} via-transparent to-primary${config.gradientOpacity} animate-gradient-mesh-3 animate-color-flow-3`} />
        </div>

        {/* Layer 2: Subtle noise texture */}
        <div className="absolute inset-0"
          style={{
            opacity: config.noiseOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            animation: 'noise-drift 20s steps(10) infinite'
          }}
        />

        {/* Layer 3: Hexagonal grid pattern */}
        <div className="absolute inset-0"
          style={{
            opacity: config.hexOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234a9eff' fill-opacity='0.4'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'hex-pulse 10s ease-in-out infinite'
          }}
        />

        {/* Layer 4: Circuit grid */}
        <div className="absolute inset-0"
          style={{
            opacity: config.circuitOpacity,
            backgroundImage: `
              linear-gradient(oklch(0.72 0.19 235 / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.72 0.19 235 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Enhanced data flow lines - multiple directions */}
        <div className={`absolute top-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary${config.flowLineOpacity} to-transparent animate-data-flow`} style={{ animationDelay: '0s', boxShadow: '0 0 6px oklch(0.62 0.22 250 / 0.15)' }} />
        <div className={`absolute top-2/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent${config.flowLineOpacity} to-transparent animate-data-flow-fast`} style={{ animationDelay: '1.5s', boxShadow: '0 0 6px oklch(0.55 0.24 300 / 0.15)' }} />
        <div className={`absolute top-3/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric${config.flowLineOpacity} to-transparent animate-data-flow`} style={{ animationDelay: '3s', boxShadow: '0 0 6px oklch(0.72 0.19 235 / 0.15)' }} />
        <div className={`absolute top-4/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary${config.flowLineOpacity} to-transparent animate-data-flow-fast`} style={{ animationDelay: '4.5s', boxShadow: '0 0 6px oklch(0.62 0.22 250 / 0.12)' }} />

        {/* Diagonal flow lines */}
        <div className={`absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent${config.flowLineOpacity} to-transparent animate-data-flow-diagonal`} style={{ left: '20%', animationDelay: '0s' }} />
        <div className={`absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-electric${config.flowLineOpacity} to-transparent animate-data-flow-diagonal`} style={{ left: '50%', animationDelay: '3s', animationDirection: 'reverse' }} />
        <div className={`absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary${config.flowLineOpacity} to-transparent animate-data-flow-diagonal`} style={{ left: '80%', animationDelay: '6s' }} />

        {/* Vertical scanning line */}
        <div className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary${config.flowLineOpacity} to-transparent animate-vertical-scan`} style={{ boxShadow: '0 0 8px oklch(0.62 0.22 250 / 0.2)' }} />

        {/* Scanning beam effect */}
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-primary${config.scanBeamOpacity} to-transparent animate-vertical-scan`} style={{ animationDuration: '8s' }} />
      </div>
    </>
  );
}
