import { Badge, Bot, Globe, Megaphone, Users, Handshake, Sparkles, Network, DollarSign, Plane, Wrench, Info } from "lucide-react";
import { useState } from "react";

const BENEFITS = [
  { category: "Brand Exposure", items: ["Website recognition", "Robot branding", "Competition presence", "Social media promotion"], icon: Globe },
  { category: "Talent Development", items: ["Connect with Robotics students", "Smart Manufacturing talent", "Engineering pipeline", "AI specialists"], icon: Users },
  { category: "Innovation Partnership", items: ["Technical collaboration", "Engineering projects", "Industry connection", "Joint R&D opportunities"], icon: Handshake },
];

const TIERS = [
  { name: "Platinum Partner", color: "from-primary to-accent", benefits: ["Premier robot branding", "Title placement on all media", "Exclusive recruitment access", "Technical showcase priority"] },
  { name: "Gold Partner", color: "from-primary/70 to-accent/70", benefits: ["Large robot & website logo", "Social media features", "Event invitations", "Campus access"] },
  { name: "Technical Partner", color: "from-electric to-primary", benefits: ["Equipment & software support", "Joint workshops", "Co-branded Academy content", "Mentoring programs"] },
  { name: "Supporting Partner", color: "from-muted-foreground/60 to-muted-foreground/40", benefits: ["Website recognition", "Social media mention", "Community engagement"] },
];

const BUDGET_DATA = {
  total: 156700,
  equipment: {
    amount: 82252,
    percentage: 52.5,
    items: [
      { name: "V5 Super Kit", cost: 28000 },
      { name: "Tools & Equipment", cost: 15000 },
      { name: "Spare Parts", cost: 12000 },
      { name: "Electronics & Sensors", cost: 18252 },
      { name: "Registration Fees", cost: 9000 },
    ],
  },
  travel: {
    amount: 85300,
    percentage: 54.5,
    events: [
      { location: "Shenzhen", airfare: 0, hotel: 150, transit: 90, entry: 4000, total: 5590 },
      { location: "Beijing", airfare: 1900, hotel: 250, transit: 95, entry: 4000, total: 22945 },
      { location: "Shanghai", airfare: 1600, hotel: 340, transit: 84, entry: 4000, total: 23884 },
      { location: "Thailand", airfare: 1400, hotel: 300, transit: 60, entry: 2250, total: 18350 },
    ],
  },
};

function CircularProgress({ percentage, color }: { percentage: number; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className={color}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset,
          transition: "stroke-dashoffset 1s ease-out",
        }}
      />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-sm font-mono font-semibold rotate-90 origin-center">
        {percentage}%
      </text>
    </svg>
  );
}

function BudgetItemWithTooltip({ item, Icon }: { item: { name: string; cost: number }; Icon: any }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li
      key={item.name}
      className="flex justify-between text-sm relative group cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {item.name}
      </span>
      <span className="font-mono text-electric text-right">HKD {item.cost.toLocaleString()}</span>
      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 z-10 glass-strong rounded-lg p-3 text-xs shadow-lg min-w-[200px]">
          <p className="font-semibold mb-1">{item.name}</p>
          <p className="text-muted-foreground">Part of the overall budget allocation for this category.</p>
        </div>
      )}
    </li>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-12 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">SPONSORSHIP</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Partner With <span className="text-gradient">GLITCH Robotics</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Support the development of future engineers and help establish a competitive robotics team representing The Hong Kong Polytechnic University internationally.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {BENEFITS.map((b, i) => (
            <div key={b.category} className="reveal glass rounded-2xl p-6 hover-lift group relative overflow-hidden" data-reveal-delay={String(i * 80)}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-electric/20 group-hover:text-electric">
                    <b.icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold transition-colors duration-300 group-hover:text-electric">{b.category}</h3>
                </div>
                <ul className="space-y-2">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-electric shrink-0 transition-transform duration-300 group-hover:scale-125" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`reveal rounded-xl ${i === 0 ? "p-[1px] relative overflow-hidden" : ""}`} data-reveal-delay={String(i * 90)}>
              {i === 0 && (
                <div className="absolute inset-0 animate-spin-slower opacity-60" style={{ background: "conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-electric), var(--color-primary))" }} />
              )}
              <div className={`relative rounded-xl p-5 ${i === 0 ? "bg-card" : "glass hover-lift"}`}>
                <p className={`font-display font-semibold bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}>
                  {t.name}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {t.benefits.map((b) => (
                    <li key={b} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Budget Transparency Section */}
        <div className="reveal mt-16 glass-strong rounded-2xl p-8" data-reveal-delay="200">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-6 w-6 text-electric" />
            <h3 className="font-display text-2xl font-semibold">Budget Transparency — HKD {BUDGET_DATA.total.toLocaleString()}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Equipment Budget */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <CircularProgress percentage={BUDGET_DATA.equipment.percentage} color="text-primary" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Equipment & Construction</h4>
                  </div>
                  <p className="font-mono text-2xl text-electric">HKD {BUDGET_DATA.equipment.amount.toLocaleString()}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {BUDGET_DATA.equipment.items.map((item) => (
                  <BudgetItemWithTooltip key={item.name} item={item} Icon={Wrench} />
                ))}
              </ul>
            </div>

            {/* Travel Budget */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <CircularProgress percentage={BUDGET_DATA.travel.percentage} color="text-accent" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Plane className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold">Travel & Competition</h4>
                  </div>
                  <p className="font-mono text-2xl text-electric">HKD {BUDGET_DATA.travel.amount.toLocaleString()}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {BUDGET_DATA.travel.events.map((event) => (
                  <BudgetItemWithTooltip key={event.location} item={{ name: event.location, cost: event.total }} Icon={Plane} />
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-electric" />
            <p>
              World Championships costs are not included in this budget. A separate budget request will be submitted upon qualification, covering international flights, accommodation, robot shipping, and emergency components.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
