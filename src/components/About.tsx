import { Lightbulb, Cog, ShieldCheck, TrendingUp, Users, Crown, type LucideIcon } from "lucide-react";

const VALUES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries with creative engineering solutions." },
  { Icon: Cog, title: "Engineering Excellence", desc: "Precision in every mechanism, line of code, and decision." },
  { Icon: ShieldCheck, title: "Integrity", desc: "Honest engineering, honest competition, honest teamwork." },
  { Icon: TrendingUp, title: "Continuous Improvement", desc: "Every failure is data; every iteration gets better." },
  { Icon: Users, title: "Teamwork", desc: "Mechanical, code, and strategy moving as one machine." },
  { Icon: Crown, title: "Leadership", desc: "Developing engineers who lead on and off the field." },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
        <div className="reveal">
          <p className="font-mono text-xs tracking-[0.35em] text-electric mb-5">ABOUT GLITCH</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
            Engineering the Future of <span className="text-gradient">University Robotics</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              GLITCH Robotics is a student-led VEX U robotics team at The Hong Kong Polytechnic
              University. Founded by students with previous VEX V5 competition experience and
              award achievements, GLITCH develops world-class university robotics through
              engineering innovation, teamwork, and continuous learning.
            </p>
            <p>
              Our mission is to design, build, and program competitive robots while inspiring
              future engineers and representing PolyU on the international stage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal glass rounded-xl p-5 transition-all duration-300 hover-lift group cursor-pointer relative overflow-hidden"
              data-reveal-delay={String(i * 80)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <v.Icon className="h-6 w-6 text-primary mb-3 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-electric" strokeWidth={1.8} />
              <h3 className="font-display font-semibold text-sm mb-1.5 transition-colors duration-300 group-hover:text-electric">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
