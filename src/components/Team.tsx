import { useState } from "react";
import { Medal, Trophy, Cpu, Wrench, Zap, Target, Camera, Users, Code, Cog, Brain, Rocket, Shield, Lightbulb, Compass, Layers, Activity, Terminal, Database, Network, Settings, Hammer, PenTool, BarChart3, MessageSquare, Globe, Sparkles } from "lucide-react";
import type { TeamMember } from "@/types";

const SECTIONS = [
  "All",
  "Leadership",
  "Mechanical",
  "Programming",
  "Electrical",
  "Strategy",
  "Media & Sponsorship",
  "Recruitment",
] as const;

const SECTION_COLORS: Record<string, string> = {
  Leadership: "from-purple-500 to-violet-500",
  Mechanical: "from-blue-500 to-cyan-500",
  Programming: "from-green-500 to-emerald-500",
  Electrical: "from-yellow-500 to-orange-500",
  Strategy: "from-pink-500 to-rose-500",
  "Media & Sponsorship": "from-indigo-500 to-purple-500",
  Recruitment: "from-teal-500 to-cyan-500",
};

const SKIN_COLORS = ["light", "brown", "pale", "dark", "tanned"] as const;

// Ultra-cool unique dark hooded character generator with distinct features per member
const avatar = (seed: string) => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // 15 unique color palettes
  const palettes = [
    { eye: '#ff00ff', accent: '#aa00aa', glow: 'rgba(255,0,255,0.3)' }, // Purple neon
    { eye: '#00ffff', accent: '#00aaaa', glow: 'rgba(0,255,255,0.3)' }, // Cyan cyber
    { eye: '#ff3366', accent: '#aa2244', glow: 'rgba(255,51,102,0.3)' }, // Red danger
    { eye: '#33ff99', accent: '#22aa66', glow: 'rgba(51,255,153,0.3)' }, // Green toxic
    { eye: '#ffaa00', accent: '#aa7700', glow: 'rgba(255,170,0,0.3)' }, // Gold elite
    { eye: '#aa55ff', accent: '#7733aa', glow: 'rgba(170,85,255,0.3)' }, // Violet mystic
    { eye: '#00ffaa', accent: '#00aa77', glow: 'rgba(0,255,170,0.3)' }, // Mint fresh
    { eye: '#ff5533', accent: '#aa3322', glow: 'rgba(255,85,51,0.3)' }, // Orange fire
    { eye: '#55aaff', accent: '#3377aa', glow: 'rgba(85,170,255,0.3)' }, // Blue ice
    { eye: '#ffffff', accent: '#aaaaaa', glow: 'rgba(255,255,255,0.3)' }, // White ghost
    { eye: '#ff0066', accent: '#aa0044', glow: 'rgba(255,0,102,0.3)' }, // Pink venom
    { eye: '#66ff00', accent: '#44aa00', glow: 'rgba(102,255,0,0.3)' }, // Lime acid
    { eye: '#ff6600', accent: '#aa4400', glow: 'rgba(255,102,0,0.3)' }, // Amber blaze
    { eye: '#0066ff', accent: '#0044aa', glow: 'rgba(0,102,255,0.3)' }, // Deep ocean
    { eye: '#cc00ff', accent: '#8800aa', glow: 'rgba(204,0,255,0.3)' }, // Ultra violet
  ];
  const palette = palettes[hash % palettes.length];

  // Unique hood designs
  const hoods = [
    'M12 88 Q12 8 50 3 Q88 8 88 88 L74 93 Q50 98 26 93 Z', // Tall pointed
    'M8 82 Q8 5 50 0 Q92 5 92 82 L78 89 Q50 95 22 89 Z', // Wide flowing
    'M18 85 Q18 15 50 10 Q82 15 82 85 L70 90 Q50 95 30 90 Z', // Classic sharp
    'M10 80 Q10 10 50 5 Q90 10 90 80 L76 87 Q50 93 24 87 Z', // Deep shadow
    'M15 83 Q15 12 50 7 Q85 12 85 83 L72 88 Q50 93 28 88 Z', // Asymmetric
  ];
  const hood = hoods[hash % hoods.length];

  // Eye shapes
  const eyes = [
    `<circle cx="42" cy="52" r="5" fill="${palette.eye}"/>
     <circle cx="58" cy="52" r="5" fill="${palette.eye}"/>`, // Round
    `<ellipse cx="42" cy="52" rx="6" ry="2.5" fill="${palette.eye}"/>
     <ellipse cx="58" cy="52" rx="6" ry="2.5" fill="${palette.eye}"/>`, // Slit
    `<polygon points="42,47 47,52 42,57 37,52" fill="${palette.eye}"/>
     <polygon points="58,47 63,52 58,57 53,52" fill="${palette.eye}"/>`, // Diamond
    `<rect x="38" y="50" width="8" height="4" fill="${palette.eye}"/>
     <rect x="54" y="50" width="8" height="4" fill="${palette.eye}"/>`, // Rectangular
    `<path d="M38 52 Q42 48 46 52 Q42 56 38 52" fill="${palette.eye}"/>
     <path d="M54 52 Q58 48 62 52 Q58 56 54 52" fill="${palette.eye}"/>`, // Crescent
  ];
  const eyeShape = eyes[hash % eyes.length];

  // Mouth designs
  const mouths = [
    `M35 68 L40 64 L45 68 L50 64 L55 68 L60 64 L65 68`, // Jagged grin
    `M38 66 Q50 73 62 66`, // Evil smile
    `M40 68 L45 65 L50 68 L55 65 L60 68`, // Small teeth
    `M36 67 L42 63 L48 67 L54 63 L60 67 L64 63`, // Wide fangs
    `M39 69 L44 66 L49 69 L54 66 L59 69`, // Subtle smirk
  ];
  const mouth = mouths[hash % mouths.length];

  // Special accessories - force horns for Wong Kwun Lam
  const hasHorns = seed === "wong-kwunlam-adrian" || hash % 4 === 0;
  const hasCrown = hash % 5 === 1;
  const hasMask = hash % 6 === 2;
  const hasScars = hash % 7 === 3;
  const hasGlowAura = hash % 3 === 0;

  // Background effects
  const bgEffects = hash % 3 === 0 ?
    `<circle cx="50" cy="50" r="40" fill="${palette.glow}" opacity="0.2"/>` :
    hash % 3 === 1 ?
    `<rect x="10" y="10" width="80" height="80" fill="${palette.glow}" opacity="0.15" rx="5"/>` :
    '';

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="glow-${hash}" cx="50%" cy="50%">
          <stop offset="0%" stop-color="${palette.eye}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${palette.eye}" stop-opacity="0"/>
        </radialGradient>
        <filter id="glitch-${hash}">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100" height="100" fill="#030303"/>
      ${bgEffects}

      <!-- Hood -->
      <path d="${hood}" fill="#151515" stroke="#252525" stroke-width="0.5"/>

      ${hasHorns ? `
      <!-- Demon horns -->
      <path d="M28 22 L22 5 L34 18" fill="#1a1a1a" stroke="${palette.accent}" stroke-width="0.8"/>
      <path d="M72 22 L78 5 L66 18" fill="#1a1a1a" stroke="${palette.accent}" stroke-width="0.8"/>
      ` : ''}

      ${hasCrown ? `
      <!-- Dark crown -->
      <path d="M30 18 L35 8 L40 16 L45 6 L50 16 L55 6 L60 16 L65 8 L70 18"
            fill="none" stroke="${palette.accent}" stroke-width="1.5"/>
      ` : ''}

      <!-- Face void -->
      <ellipse cx="50" cy="55" rx="30" ry="24" fill="#000"/>

      ${hasMask ? `
      <!-- Cyber mask -->
      <path d="M22 48 Q50 42 78 48 L78 72 Q50 78 22 72 Z" fill="#0f0f0f" opacity="0.9"/>
      <line x1="30" y1="55" x2="70" y2="55" stroke="${palette.accent}" stroke-width="0.5" opacity="0.5"/>
      <line x1="30" y1="60" x2="70" y2="60" stroke="${palette.accent}" stroke-width="0.5" opacity="0.5"/>
      ` : ''}

      ${hasScars ? `
      <!-- Battle scars -->
      <line x1="35" y1="45" x2="40" y2="50" stroke="${palette.accent}" stroke-width="1" opacity="0.6"/>
      <line x1="65" y1="48" x2="60" y2="53" stroke="${palette.accent}" stroke-width="1" opacity="0.6"/>
      ` : ''}

      <!-- Eyes -->
      ${eyeShape}

      <!-- Eye glow aura -->
      ${hasGlowAura ? `
      <circle cx="42" cy="52" r="12" fill="url(#glow-${hash})" opacity="0.8"/>
      <circle cx="58" cy="52" r="12" fill="url(#glow-${hash})" opacity="0.8"/>
      ` : `
      <circle cx="42" cy="52" r="9" fill="url(#glow-${hash})" opacity="0.6"/>
      <circle cx="58" cy="52" r="9" fill="url(#glow-${hash})" opacity="0.6"/>
      `}

      <!-- Mouth -->
      <path d="${mouth}" stroke="${palette.eye}" stroke-width="2" fill="none"
            opacity="0.9" filter="url(#glitch-${hash})"/>

      <!-- Energy particles -->
      <circle cx="${15 + hash % 20}" cy="${25 + hash % 25}" r="1.5" fill="${palette.eye}" opacity="0.7"/>
      <circle cx="${75 + hash % 15}" cy="${40 + hash % 20}" r="1" fill="${palette.accent}" opacity="0.6"/>
      <circle cx="${30 + hash % 25}" cy="${75 + hash % 15}" r="1.2" fill="${palette.eye}" opacity="0.5"/>
      <circle cx="${65 + hash % 20}" cy="${70 + hash % 20}" r="0.8" fill="${palette.accent}" opacity="0.7"/>

      <!-- Glitch lines -->
      <line x1="${10 + hash % 25}" y1="${30 + hash % 20}" x2="${25 + hash % 20}" y2="${30 + hash % 20}"
            stroke="${palette.eye}" stroke-width="1" opacity="0.5"/>
      <line x1="${70 + hash % 20}" y1="${35 + hash % 25}" x2="${90 + hash % 10}" y2="${35 + hash % 25}"
            stroke="${palette.accent}" stroke-width="1" opacity="0.4"/>
    </svg>
  `)}`;
};

// Icon mapping based on actual team member profiles from documentation
const MEMBER_ICONS: Record<string, React.ElementType> = {
  "YU Ka Wai": Cpu, // 4+ years VEX; mechanical + autonomous programming + leadership; pneumatic systems expert
  "Wong Kwun Lam": Compass, // Strategy expert; drivetrain tuning; scouting & competition tactics
  "WONG Colin Michael": Terminal, // Programming specialist; C++/PROS; autonomous routines
  "YEUNG Lok Him": Wrench, // Strong CAD (Onshape/SolidWorks); gear ratios; metal/carbon fiber fabrication
  "NG Ching Man": Sparkles, // Building competitions; rapid prototyping; excellent presentation & PPT skills
  "Leong I Leng": Zap, // WRO experience; mission strategy; attachment design; time-optimized performance
  "Liu Huanying": PenTool, // CAD expert (SolidWorks/Fusion 360); chassis & manipulator design; laser cutting
  "Li Wing Lam": Database, // Engineering Notebook specialist; documentation; judges' presentation skills
  "Pinpinut WATANAWALUN": Settings, // 3D printing; assembly; testing; rapid prototyping
  "Chong Yuet": Network, // Data analysis; game theory; strategic planning & optimization
};

const MEMBERS: TeamMember[] = [
  { name: "YU Ka Wai", role: "All-around", department: "Local", section: "Leadership", skills: ["Mechanical", "Programming", "Strategy"], vexExperience: "VEX since secondary school", awards: "Multiple VEX awards & competition experience", interests: "Full-stack robotics", photo: avatar("yu-kawai-william") },
  { name: "Wong Kwun Lam", role: "All-around", department: "Local", section: "Leadership", skills: ["CAD", "Build", "Testing"], vexExperience: "VEX since secondary school", awards: "Multiple VEX awards & competition experience", interests: "System optimization", photo: avatar("wong-kwunlam-adrian") },
  { name: "WONG Colin Michael", role: "Programmer", department: "Non-mainland non-local", section: "Programming", skills: ["C++", "PROS", "Autonomous"], vexExperience: "VEX U 2026-27", awards: "Programming Specialist", interests: "AI integration", photo: avatar("wong-colin-michael") },
  { name: "YEUNG Lok Him", role: "Programmer", department: "Local", section: "Programming", skills: ["PID", "Odometry", "Sensors", "RC Cars", "Advanced Control"], vexExperience: "External competitions (RC cars, robotics)", awards: "Multi-technique specialist", interests: "Motion planning & advanced control systems", photo: avatar("yeung-lokhim-jaco") },
  { name: "NG Ching Man", role: "Strategy", department: "Local", section: "Strategy", skills: ["Scouting", "Analytics", "Match Planning"], vexExperience: "VEX U 2026-27", awards: "Strategic Analysis", interests: "Competition tactics", photo: avatar("ng-chingman-alice") },
  { name: "Leong I Leng", role: "Mechanical design/build", department: "Non-local", section: "Mechanical", skills: ["SolidWorks", "CNC", "Prototyping"], vexExperience: "VEX U 2026-27", awards: "Design Excellence", interests: "Mechanism innovation", photo: avatar("leong-ileng-elaine") },
  { name: "Liu Huanying", role: "Promote", department: "Mainland non-local", section: "Media & Sponsorship", skills: ["Outreach", "Branding", "Communication"], vexExperience: "VEX U 2026-27", awards: "Team Ambassador", interests: "Public relations", photo: avatar("liu-huanying-holly") },
  { name: "Li Wing Lam", role: "Promote", department: "Local", section: "Media & Sponsorship", skills: ["Social Media", "Content", "Events"], vexExperience: "VEX U 2026-27", awards: "Media Coordinator", interests: "Digital marketing", photo: avatar("li-winglam-niki") },
  { name: "Pinpinut WATANAWALUN", role: "Mechanical design/build", department: "Non-mainland non-local", section: "Mechanical", skills: ["3D Printing", "Assembly", "Testing"], vexExperience: "VEX U 2026-27", awards: "Build Specialist", interests: "Rapid prototyping", photo: avatar("pinpinut-watanawalun") },
  { name: "Chong Yuet", role: "Strategy", department: "Local", section: "Strategy", skills: ["Data Analysis", "Game Theory", "Planning"], vexExperience: "VEX U 2026-27", awards: "Strategic Planner", interests: "Optimization", photo: avatar("chong-yuet") },
];

function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  const sectionColor = SECTION_COLORS[member.section] || "from-primary to-accent";
  const IconComponent = MEMBER_ICONS[member.name] || Users;

  return (
    <div
      className="reveal relative glass rounded-xl p-6 flex flex-col gap-3 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 group overflow-hidden"
      data-reveal-delay={String(delay)}
    >
      {/* Color indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sectionColor}`} />

      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Outer glow ring */}
          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${sectionColor} opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500`} />
          {/* Avatar container */}
          <div className="relative size-16 rounded-full bg-secondary border-2 border-primary/30 overflow-hidden group-hover:border-primary/60 transition-all duration-300">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Small icon badge in corner */}
          <div className={`absolute -bottom-1 -right-1 size-6 rounded-full bg-gradient-to-br ${sectionColor} flex items-center justify-center shadow-lg`}>
            <IconComponent className="size-3.5 text-white" />
          </div>
        </div>
        <div>
          <h3 className="font-display font-semibold">{member.name}</h3>
          <p className="text-xs text-electric">{member.role}</p>
          <p className="text-xs text-muted-foreground">{member.department}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {member.skills.map((s) => (
          <span key={s} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground transition-all duration-300 group-hover:bg-primary/15 group-hover:text-electric group-hover:border-primary/60 group-hover:shadow-[0_0_10px_-2px_oklch(0.62_0.22_250_/_30%)]">
            {s}
          </span>
        ))}
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <Trophy className="size-3.5 text-electric shrink-0 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_oklch(0.70_0.22_300_/_60%)]" />
          {member.vexExperience}
        </p>
        <p className="flex items-center gap-1.5">
          <Medal className="size-3.5 text-violet-glow shrink-0 transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_oklch(0.70_0.22_300_/_60%)]" />
          {member.awards}
        </p>
      </div>
    </div>
  );
}

export default function Team() {
  const [active, setActive] = useState<(typeof SECTIONS)[number]>("All");
  const filtered = active === "All" ? MEMBERS : MEMBERS.filter((m) => m.section === active);

  return (
    <section id="team" className="section-pad pt-[0px] pb-[0px]">
      <div className="mx-auto max-w-6xl pt-[0px] pb-[0px] pl-[20px] pr-[20px]">
        <p className="reveal font-mono text-xs tracking-[0.3em] text-electric">THE PEOPLE</p>
        <h2 className="reveal mt-3 font-display text-3xl md:text-5xl font-bold">
          OUR <span className="text-gradient">TEAM</span>
        </h2>
        <p className="reveal mt-4 max-w-2xl text-muted-foreground">
          Student engineers across mechanical, programming, electrical, strategy, media and recruitment — united by one goal: world-class robotics at PolyU.
        </p>

        <div className="reveal mt-8 flex flex-wrap items-center gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${
                active === s
                  ? `bg-gradient-to-r ${SECTION_COLORS[s] || "from-primary to-accent"} border-transparent text-white shadow-[0_0_15px_-3px_oklch(0.62_0.22_250_/_40%)]`
                  : "border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground font-mono">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div key={active} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-scale">
          {filtered.map((m, i) => (
            <MemberCard key={m.name} member={m} delay={(i % 3) * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
