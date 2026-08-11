import { Trophy, Medal } from "lucide-react";

const SECTIONS = ["Leadership", "Mechanical", "Programming", "Strategy", "Media & Partnership"] as const;

interface Member {
  name: string;
  role: string;
  department: string;
  skills: string[];
  vexExperience: string;
  awards: string;
}

const MEMBERS: Record<string, Member[]> = {
  Leadership: [
    { name: "Jason L.", role: "Team Captain", department: "Mechanical Engineering", skills: ["Leadership", "CAD", "Project Mgmt"], vexExperience: "V5RC 3 seasons", awards: "Regional Design Award" },
    { name: "Chloe W.", role: "Technical Lead", department: "Electronic Engineering", skills: ["Strategy", "Systems", "Sensors"], vexExperience: "V5RC 2 seasons", awards: "Excellence Award Finalist" },
  ],
  Mechanical: [
    { name: "Marco C.", role: "Mechanical Lead", department: "Mechanical Engineering", skills: ["SolidWorks", "CNC", "Gear Design"], vexExperience: "V5RC 3 seasons", awards: "Build Award" },
    { name: "Ivy N.", role: "Mechanical Engineer", department: "Product Design", skills: ["CAD", "3D Printing", "Prototyping"], vexExperience: "V5RC 1 season", awards: "Judges Award" },
  ],
  Programming: [
    { name: "Daniel C.", role: "Programming Lead", department: "Computer Engineering", skills: ["C++", "PROS", "PID"], vexExperience: "V5RC 3 seasons", awards: "Robot Skills Champion" },
    { name: "Sara L.", role: "Software Engineer", department: "Computer Science", skills: ["Odometry", "Vision", "Git"], vexExperience: "V5RC 2 seasons", awards: "Innovate Award" },
  ],
  Strategy: [
    { name: "Oscar L.", role: "Strategy Analyst", department: "Data Science", skills: ["Scouting", "Analytics", "Python"], vexExperience: "V5RC 2 seasons", awards: "Think Award" },
  ],
  "Media & Partnership": [
    { name: "Mia Y.", role: "Media Lead", department: "Marketing", skills: ["Branding", "Video", "Social"], vexExperience: "New to VEX", awards: "Campus Media Prize" },
    { name: "Leo F.", role: "Partnership Officer", department: "Business", skills: ["Outreach", "Proposals", "Pitching"], vexExperience: "New to VEX", awards: "Debate Champion" },
  ],
};

const avatar = (seed: string) => `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(seed)}`;

export default function FoundingTeam() {
  return (
    <section id="team" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-10 text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-electric uppercase">The People Behind GLITCH</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">
            FOUNDING <span className="text-gradient">TEAM</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Built upon previous VEX V5 competition experience and achievements. GLITCH is founded by students who have competed, won awards, and now aim higher at the university level.
          </p>
        </div>

        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <div key={section} className="reveal">
              <h3 className="font-display text-xl font-semibold mb-6 text-primary">{section}</h3>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {(MEMBERS[section] || []).map((m, i) => (
                  <div
                    key={m.name}
                    className="glass rounded-xl p-6 flex flex-col gap-3 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 group"
                    data-reveal-delay={String(i * 80)}
                  >
                    <div className="flex items-center gap-4">
                      <img src={avatar(m.name)} alt={m.name} className="size-14 rounded-full ring-2 ring-primary/40 bg-secondary transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                      <div>
                        <h4 className="font-display font-semibold">{m.name}</h4>
                        <p className="text-xs text-electric">{m.role}</p>
                        <p className="text-xs text-muted-foreground">{m.department}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.skills.map((s) => (
                        <span key={s} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-electric">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5">
                        <Trophy className="size-3.5 text-electric shrink-0" />
                        {m.vexExperience}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Medal className="size-3.5 text-violet-glow shrink-0" />
                        {m.awards}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
