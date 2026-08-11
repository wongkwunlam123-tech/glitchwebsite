import { createFileRoute } from "@tanstack/react-router";
import { DraftingCompass, Cog, Wrench, Factory, ArrowRight, AlertTriangle, CheckCircle2, Cpu, Layers, Printer, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/academy/mechanical")({ component: MechanicalPage });

const MODULES = [
  { Icon: DraftingCompass, title: "CAD Design", desc: "Parametric modeling and assemblies in Onshape / Fusion 360." },
  { Icon: Cog, title: "Drivetrain Systems", desc: "Gear ratios, chain drive, and chassis type selection." },
  { Icon: Wrench, title: "Mechanism Design", desc: "Engineering trade-offs in intake, lift, and launcher mechanisms." },
  { Icon: Factory, title: "Manufacturing & Assembly", desc: "3D printing, CNC machining, tolerances, and quality control." },
];
const PROCESS = ["Ideate", "CAD", "Prototype", "Iterate"];

const PARTS = [
  { category: "Electronics", Icon: Cpu, items: [
    { name: "V5 Robot Brain", desc: "Central controller running PROS / VEXcode" },
    { name: "V5 Robot Radio", desc: "Wireless link to the controller" },
    { name: "Smart Motors (11W)", desc: "Integrated encoder + gearing" },
    { name: "Smart Cables", desc: "RJ9 connectors for sensors & motors" },
    { name: "V5 Controller", desc: "Driver input with screen & buttons" },
    { name: "Battery (Li-Ion)", desc: "Rechargeable competition power cell" },
    { name: "Power Expander", desc: "Extra ports for high-draw subsystems" },
    { name: "Optical Shaft Encoder", desc: "Tracks axle rotation precisely" },
    { name: "Inertial Sensor (IMU)", desc: "Heading, acceleration & gyro data" },
    { name: "Distance Sensor", desc: "Ultrasonic object ranging" },
    { name: "Vision Sensor", desc: "Color & signature detection camera" },
    { name: "GPS Sensor", desc: "Absolute field positioning" },
    { name: "Rotation Sensor", desc: "360° absolute angle feedback" },
    { name: "Bumper Switch", desc: "Digital contact trigger" },
    { name: "Limit Switch", desc: "End-of-travel position stop" },
    { name: "Line Tracker", desc: "Reflectance sensor for line following" },
  ]},
  { category: "Structural", Icon: Layers, items: [
    { name: "C-Channel", desc: "Various lengths, primary frame rail" },
    { name: "Angle Brackets", desc: "90° corner connections" },
    { name: "Flat Brackets", desc: "Inline plate joins" },
    { name: "Standoffs", desc: "Raised mounting spacers" },
    { name: "Spacers", desc: "Axle & shaft spacing" },
    { name: "Locknuts & Nylock Nuts", desc: "Vibration-resistant fasteners" },
    { name: "Screws (#8-32, #6-32)", desc: "Standard hardware sizes" },
    { name: "Kep Nuts", desc: "Built-in washer nuts" },
    { name: "Star Lock Washers", desc: "Anti-loosening washers" },
    { name: "Bearing Flats", desc: "Low-friction axle mounts" },
    { name: "Axle Inserts", desc: "Square-to-round adapters" },
  ]},
  { category: "Drivetrain", Icon: Cog, items: [
    { name: "Omni Wheels (2.75/3.25/4\")", desc: "Free lateral sliding motion" },
    { name: "Traction Wheels", desc: "High-grip rubber tires" },
    { name: "Mecanum Wheels", desc: "Holonomic diagonal rollers" },
    { name: "High-Strength Gears (12/36/60/84T)", desc: "Torque & speed reduction" },
    { name: "Axles (square)", desc: "Positive-drive square shafts" },
    { name: "Drive Shafts", desc: "Power transmission rods" },
    { name: "Bearings", desc: "Smooth rotational support" },
    { name: "Chain & Sprockets", desc: "Long-distance power transfer" },
    { name: "Pneumatic Cylinders (optional)", desc: "Linear actuation force" },
  ]},
  { category: "Motion & Linkage", Icon: Wrench, items: [
    { name: "Pneumatics Kit", desc: "Air tanks, valves & tubing" },
    { name: "Rubber Bands", desc: "Passive tension & return" },
    { name: "Elastics", desc: "Stretch linkage elements" },
    { name: "Springs", desc: "Compression & extension force" },
    { name: "Zip Ties", desc: "Quick cable management" },
    { name: "Velcro", desc: "Removable game-object grip" },
    { name: "Tubing", desc: "Pneumatic air lines" },
    { name: "Bushings", desc: "Wear-reducing sleeves" },
    { name: "Collars", desc: "Axle position locks" },
    { name: "Pulleys", desc: "Belt-driven motion" },
    { name: "Belts", desc: "Quiet power transmission" },
  ]},
  { category: "Tools & Fabrication", Icon: Factory, items: [
    { name: "Hex Keys", desc: "Allen wrench set" },
    { name: "Screwdrivers", desc: "Phillips & flathead" },
    { name: "Wire Strippers", desc: "Cable prep tool" },
    { name: "Crimp Tool", desc: "Connector termination" },
    { name: "3D Printer Filament (PETG/TPU/PLA)", desc: "Custom part material" },
    { name: "Hand Files", desc: "Edge finishing" },
    { name: "Deburring Tool", desc: "Smooth machined edges" },
  ]},
];

const PRINT = [
  { mat: "PETG", nozzle: "240-250°C", bed: "70-80°C", speed: "40-60 mm/s", ret: "4-6mm @ 35mm/s", tip: "Dry filament first! PETG absorbs moisture fast." },
  { mat: "TPU", nozzle: "220-235°C", bed: "50-60°C", speed: "20-30 mm/s", ret: "0-2mm (direct drive only)", tip: "Use direct extruder. Bowden + TPU = jam city." },
  { mat: "PLA", nozzle: "190-210°C", bed: "50-60°C", speed: "50-80 mm/s", ret: "5-7mm @ 45mm/s", tip: "Only for jigs, templates, non-load-bearing prototypes." },
];

const MISTAKES = [
  { title: "The Broken Intake Roller", body: "We 3D-printed our first intake rollers in PLA. After 2 matches, they cracked at the bearing mount due to impact stress. Lesson: PLA is brittle — always use PETG or TPU for parts that see repeated impacts.", lesson: "Material selection matters more than geometry. Test with worst-case loads before competition." },
  { title: "Over-Engineered Chassis", body: "Our first chassis used 1/8\" 7075 everywhere. It was bombproof but weighed 18 lbs — too heavy for agile scoring. We redesigned with 6061 for non-critical sections and saved 5 lbs.", lesson: "Not every part needs aerospace-grade aluminum. Match material to actual stress levels." },
];

function MechanicalPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all parts for searching
  const allParts = PARTS.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));
  const filteredParts = searchQuery
    ? allParts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section className="mx-auto max-w-5xl px-6">
          <div className="reveal mb-12">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">ACADEMY</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">MECHANICAL <span className="text-gradient">TRACK</span></h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">From CAD to competition-ready hardware — everything a VEX U builder needs to know.</p>

            {/* Search Bar */}
            <div className="mt-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search parts (e.g., 'motor', 'gear', 'sensor')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg glass border border-border/50 bg-secondary/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              {searchQuery && (
                <p className="text-xs text-muted-foreground mt-2">
                  Found {filteredParts.length} result{filteredParts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-12">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-electric" />
                Search Results
              </h2>
              {filteredParts.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {filteredParts.map((part, i) => (
                    <div key={`${part.name}-${i}`} className="glass rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{part.name}</p>
                          <p className="text-xs text-muted-foreground">{part.desc}</p>
                          <p className="text-[10px] text-primary/60 mt-1 font-mono">{part.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass rounded-xl p-8 text-center">
                  <p className="text-muted-foreground">No parts found matching "{searchQuery}"</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">Try different keywords like "motor", "gear", or "sensor"</p>
                </div>
              )}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {MODULES.map((m, i) => (
              <div key={m.title} className="reveal glass rounded-xl p-6 hover-lift group transition-all duration-300" data-reveal-delay={String(i * 80)}>
                <m.Icon className="h-8 w-8 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:text-electric" strokeWidth={1.5} />
                <h3 className="font-display font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal glass-strong rounded-2xl p-8 mb-14" data-reveal-delay="200">
            <h3 className="font-display text-xl font-semibold mb-6">Design Process</h3>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {PROCESS.map((step, i) => (
                <div key={step} className="flex items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-mono text-xs text-electric">{i + 1}</span>
                    <span className="font-display font-semibold text-sm">{step}</span>
                  </div>
                  {i < PROCESS.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="reveal text-center font-display text-3xl font-bold mb-3">VEX U <span className="text-gradient">Super Kit</span> Parts</h2>
            <p className="reveal text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">Know every component in the kit — the foundation of any competitive build.</p>
            {PARTS.map((cat, ci) => (
              <div key={cat.category} className="reveal glass rounded-2xl p-6 mb-5" data-reveal-delay={String(ci * 60)}>
                <h3 className="font-display font-semibold text-electric mb-4 flex items-center gap-2"><cat.Icon className="h-5 w-5" strokeWidth={1.8} />{cat.category}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cat.items.map((it) => (
                    <div key={it.name} className="flex gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{it.name}</p>
                        <p className="text-xs text-muted-foreground">{it.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-14">
            <h2 className="reveal text-center font-display text-3xl font-bold mb-8 flex items-center justify-center gap-3"><Printer className="h-7 w-7 text-electric" />3D Printing <span className="text-gradient">Settings Guide</span></h2>
            <div className="grid md:grid-cols-3 gap-5">
              {PRINT.map((p, i) => (
                <div key={p.mat} className="reveal glass rounded-xl p-6" data-reveal-delay={String(i * 80)}>
                  <p className="font-display font-bold text-electric text-lg mb-4">{p.mat}</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Nozzle:</span> {p.nozzle}</p>
                    <p><span className="font-semibold">Bed:</span> {p.bed}</p>
                    <p><span className="font-semibold">Speed:</span> {p.speed}</p>
                    <p><span className="font-semibold">Retraction:</span> {p.ret}</p>
                  </div>
                  <div className="border-t border-border/60 mt-4 pt-3">
                    <p className="text-muted-foreground italic text-xs">{p.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="reveal text-center font-display text-3xl font-bold mb-8 flex items-center justify-center gap-3"><AlertTriangle className="h-7 w-7 text-red-400" />Glitch's Mistakes</h2>
            <div className="space-y-5">
              {MISTAKES.map((m, i) => (
                <div key={m.title} className="reveal glass rounded-xl p-6 border-l-4 border-red-500 pl-5" data-reveal-delay={String(i * 100)}>
                  <h3 className="text-red-400 font-bold mb-2">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{m.body}</p>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="h-4 w-4 text-electric mt-0.5 flex-shrink-0" />
                    <p className="text-electric font-semibold text-sm">Lesson: {m.lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
}
