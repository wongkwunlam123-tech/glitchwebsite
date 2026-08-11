import { Trophy, Medal, Award, Star } from "lucide-react";
import type { Achievement } from "@/types";

const ACHIEVEMENTS: Achievement[] = [
  { year: "2026", title: "Regional Design Award", description: "Outstanding mechanical design and engineering innovation at VEX V5 Regional Competition", icon: "trophy" },
  { year: "2026", title: "Excellence Award Finalist", description: "Recognized for overall team performance including robot design, skills, and documentation", icon: "medal" },
  { year: "2025", title: "Build Award", description: "Exceptional construction quality and attention to detail in robot assembly", icon: "award" },
  { year: "2025", title: "Robot Skills Champion", description: "Highest combined autonomous and driver control scores in regional competition", icon: "trophy" },
  { year: "2025", title: "Innovate Award", description: "Creative problem-solving and innovative approach to game challenges", icon: "star" },
  { year: "2024", title: "Judges Award", description: "Special recognition from competition judges for outstanding contribution", icon: "award" },
  { year: "2024", title: "Energy Award", description: "Demonstrated exceptional energy and enthusiasm throughout the competition season", icon: "medal" },
  { year: "2024", title: "Think Award", description: "Strategic excellence in match analysis and tactical decision-making", icon: "star" },
];

const ICON_MAP: Record<string, any> = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  star: Star,
};

const PREMIUM_AWARDS = ["Regional Design Award", "Excellence Award Finalist", "Robot Skills Champion"];

export default function Achievements() {
  const years = Array.from(new Set(ACHIEVEMENTS.map((a) => a.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <section id="achievements" className="section-pad pt-[0px] pb-[0px] pl-[20px] pr-[20px]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase">Our Success</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">
            Awards & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Recognition of our team's dedication to engineering excellence and competitive performance in VEX Robotics.
          </p>
        </div>

        {years.map((year, yearIndex) => {
          const yearAwards = ACHIEVEMENTS.filter((a) => a.year === year);
          return (
            <div key={year} className="mb-10">
              <h3 className="reveal font-display text-2xl font-semibold mb-6 flex items-center gap-3" data-reveal-delay={String(yearIndex * 100)}>
                <Trophy className="h-6 w-6 text-primary animate-pulse" />
                <span className="text-gradient">{year}</span>
                <span className="glass rounded-full px-3 py-1 text-xs font-mono text-electric">{yearAwards.length} awards</span>
                <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {yearAwards.map((achievement, i) => {
                  const IconComponent = ICON_MAP[achievement.icon] || Award;
                  const isPremium = PREMIUM_AWARDS.includes(achievement.title);
                  return (
                    <div
                      key={`${year}-${i}`}
                      className={`reveal relative rounded-xl hover-lift group overflow-hidden ${isPremium ? 'p-[1px]' : 'glass p-6'}`}
                      data-reveal-delay={String(i * 80)}
                    >
                      {isPremium && (
                        <>
                          <div className="absolute inset-0 animate-spin-slower opacity-70" style={{ background: "conic-gradient(from 0deg, oklch(0.75 0.18 85), oklch(0.70 0.22 300), oklch(0.75 0.18 85))" }} />
                          <div className="absolute inset-[1px] rounded-xl bg-card" />
                        </>
                      )}
                      <div className={`relative ${!isPremium ? '' : 'p-6'}`}>
                        <div className="flex items-start gap-4 min-h-[120px]">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${isPremium ? 'bg-gradient-to-br from-yellow-500/20 to-purple-500/20 text-yellow-400' : 'bg-primary/15 text-primary group-hover:bg-electric/20 group-hover:text-electric'}`}>
                            <IconComponent size={22} className={isPremium ? 'animate-pulse' : ''} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-display font-semibold text-lg transition-colors duration-300 ${isPremium ? 'text-yellow-400 group-hover:text-yellow-300' : 'group-hover:text-electric'}`}>
                              {achievement.title}
                            </h4>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        {isPremium && (
                          <div className="absolute -inset-4 bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
