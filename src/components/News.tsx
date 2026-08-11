import { Calendar, Clock, ArrowUpRight, X } from "lucide-react";
import type { NewsArticle } from "@/types";
import { useState } from "react";

const ARTICLES: NewsArticle[] = [
  {
    category: "Team Announcement",
    title: "GLITCH Robotics: Team Formation Announcement",
    excerpt:
      "We are proud to announce the official formation of GLITCH Robotics, The Hong Kong Polytechnic University's newest VEX U robotics team. Founded by students with previous VEX V5 competition experience, GLITCH aims to represent PolyU on the international stage.",
    content: `We are proud to announce the official formation of GLITCH Robotics, The Hong Kong Polytechnic University's newest VEX U robotics team.

Founded by a group of passionate engineering students with previous VEX V5 competition experience, GLITCH Robotics represents a new chapter in PolyU's involvement in competitive robotics. Our team brings together talent from Mechanical Engineering, Computer Engineering, Electronic Engineering, and AI departments.

Our Mission:
GLITCH Robotics is committed to pushing the boundaries of what's possible in undergraduate robotics competition. We believe in learning through doing, innovation through collaboration, and excellence through dedication.

Why "GLITCH"?
The name reflects our philosophy: sometimes the most interesting solutions come from unexpected places. A glitch isn't always an error — it can be an opportunity to discover something new. We embrace creative problem-solving and aren't afraid to challenge conventional approaches.

Looking Ahead:
As we prepare for the VEX U 2026-2027 season, our focus is on building a strong foundation — both in terms of technical capability and team culture. We're recruiting talented individuals who share our passion for engineering and competition.

Join us on this journey as we work towards representing PolyU at the VEX U World Championship 2027!`,
    date: "2026-08-01",
    readTime: "5 min",
  },
  {
    category: "Robot Development",
    title: "GLITCH-01: Initial Robot Design Kickoff",
    excerpt:
      "Our engineering team has begun the design phase for GLITCH-01, our first competitive VEX U robot. This article covers our initial concept sketches, drivetrain architecture decisions, and the mechanical subsystems we plan to prioritize.",
    content: `Our engineering team has officially kicked off the design phase for GLITCH-01, our first competitive VEX U robot. This marks a significant milestone in our team's journey.

Design Philosophy:
After extensive analysis of the current VEX U game, our mechanical team has identified three key priorities: versatility, reliability, and speed. GLITCH-01 needs to excel at multiple tasks while maintaining consistent performance under competition pressure.

Drivetrain Architecture:
We've decided on a holonomic drive system using mecanum wheels. This gives us the ability to move in any direction without rotating, which is crucial for precise positioning during autonomous periods and quick adjustments during driver control.

Key Subsystems in Development:
1. Intake Mechanism: A dual-roller design with adjustable height to handle various game objects
2. Scoring Arm: A multi-jointed arm capable of reaching all scoring zones
3. Climbing System: Integrated into the chassis for endgame points
4. Sensor Array: Combining optical encoders, IMU, and vision sensors for autonomous navigation

CAD Progress:
Our CAD team is working in Onshape, creating detailed models of each subsystem. We're following an iterative design process — prototype, test, refine. Early simulations show promising results for our drivetrain configuration.

Next Steps:
Over the coming weeks, we'll finalize the chassis design and begin ordering components. Stay tuned for updates as GLITCH-01 takes shape!`,
    date: "2026-07-25",
    readTime: "7 min",
  },
  {
    category: "Competition Preparation",
    title: "Preparing for VEX U 2026-2027 Season",
    excerpt:
      "As the new VEX U game is revealed, our strategy and programming teams are analyzing scoring opportunities, autonomous requirements, and alliance dynamics. Here's our early-season preparation roadmap.",
    content: `The VEX U 2026-2027 game has been revealed, and our team is diving deep into analysis and preparation. Here's how we're approaching the new season.

Game Analysis:
Our strategy team spent the first week breaking down every aspect of the new game. We identified high-value scoring opportunities, analyzed risk-reward ratios for different strategies, and mapped out potential alliance synergies.

Key Insights:
- Autonomous period offers 40% of total match points — programming precision is critical
- Endgame climbing mechanics have changed significantly from last season
- Alliance coordination during driver control can multiply scoring efficiency

Programming Priorities:
Our programming team is focusing on:
1. Path planning algorithms for autonomous navigation
2. Vision-based object detection and tracking
3. PID control tuning for precise motor movements
4. Driver assistance features (auto-leveling, position correction)

Practice Schedule:
We've established a weekly practice routine:
- Monday: CAD review and mechanical work
- Wednesday: Programming sessions and sensor testing
- Friday: Full team integration and mock matches
- Weekend: Strategy discussions and documentation

Alliance Building:
One unique aspect of VEX U is the alliance format. We're already reaching out to other teams in our region to build relationships and discuss potential alliance strategies for upcoming competitions.

The road to Worlds starts now!`,
    date: "2026-07-18",
    readTime: "6 min",
  },
  {
    category: "Sponsor Partnership",
    title: "Seeking Industry Partners for GLITCH Robotics",
    excerpt:
      "GLITCH Robotics is actively seeking corporate sponsors and technical partners to support our journey to the VEX U World Championship 2027. Learn about our sponsorship packages and how your organization can contribute to engineering education.",
    content: `GLITCH Robotics is actively seeking corporate sponsors and technical partners to support our journey to the VEX U World Championship 2027.

Why Partner With Us?
Sponsoring GLITCH Robotics isn't just about supporting a student team — it's an investment in the next generation of engineers. Our members go on to work at leading technology companies, and the skills they develop here directly translate to industry-ready capabilities.

Sponsorship Tiers:

🥇 Platinum Partner
- Premier robot branding and title placement on all media
- Exclusive recruitment access and technical showcase priority
- Dedicated social media features and press mentions
- Invitation to exclusive team demonstrations

🥈 Gold Partner
- Large robot & website logo placement
- Social media features and event invitations
- Campus access and quarterly progress updates
- Access to recruitment networking events

🔧 Technical Partner
- Equipment & software support collaboration
- Joint workshops and co-branded Academy content
- Mentoring programs and technical collaboration
- Engineering projects and industry connection

🤝 Supporting Partner
- Website recognition and social media mention
- Community engagement opportunities
- Annual team report and updates

How Your Support Helps:
- Competition registration and travel expenses
- Robot components and manufacturing costs
- Workshop equipment and safety gear
- Educational resources and training materials

Budget Transparency:
We maintain full transparency in fund allocation. Visit our Sponsors page to see detailed breakdowns of equipment costs (HKD 82,252) and travel expenses (HKD 85,300) across regional competitions.

Get In Touch:
If you're interested in partnering with GLITCH Robotics, please visit our Sponsors page or contact us directly. We'd love to discuss how we can create a mutually beneficial partnership.`,
    date: "2026-07-10",
    readTime: "4 min",
  },
  {
    category: "Team Update",
    title: "Recruitment Drive: Join GLITCH Robotics",
    excerpt:
      "We are recruiting talented students from Mechanical Engineering, Computer Engineering, Electronic Engineering, AI, and Business departments. No previous robotics experience required — just passion for engineering and teamwork.",
    content: `We are recruiting talented students from across PolyU to join GLITCH Robotics!

Who We're Looking For:
You don't need previous robotics experience to join our team. What matters most is your passion for engineering, willingness to learn, and ability to work collaboratively. We welcome students from:

- Mechanical Engineering: CAD design, mechanism development, manufacturing
- Computer Engineering & AI: PROS/C++ programming, autonomous routines, computer vision
- Electronic Engineering: Sensor integration, circuit design, signal processing
- Business & Marketing: Sponsorship outreach, event planning, documentation

What You'll Gain:
✓ Hands-on experience with real engineering projects
✓ Mentorship from senior team members
✓ Portfolio-worthy achievements for job applications
✓ Networking with industry professionals and alumni
✓ The thrill of competition at regional and world championships

No Experience? No Problem!
Many of our founding members started with zero VEX experience. We provide comprehensive training in:
- CAD software (Onshape/Fusion 360)
- PROS programming framework
- VEX hardware and electronics
- Competition strategy and alliance dynamics

Application Process:
1. Fill out the application form on our Join page
2. Attend an info session or team meetup
3. Complete a brief skills assessment (don't worry, it's not scary!)
4. Join us for hands-on workshops and team bonding

Ready to Build Something Amazing?
Visit our Join page to start your application. We can't wait to meet you!`,
    date: "2026-07-05",
    readTime: "3 min",
  },
  {
    category: "Engineering",
    title: "Setting Up Our Workshop and Testing Facility",
    excerpt:
      "A behind-the-scenes look at how we organized our workshop space at PolyU, including tool inventory, safety protocols, and the testing rigs we built for drivetrain and mechanism validation.",
    content: `A behind-the-scenes look at how we set up our workshop and testing facility at PolyU.

Space Planning:
Our workshop is divided into four main zones:
1. CAD Station: Computers with Onshape licenses for design work
2. Fabrication Area: 3D printers, hand tools, and assembly benches
3. Testing Zone: Dedicated space for drivetrain and mechanism testing
4. Storage: Organized inventory of VEX parts and components

Tool Inventory:
We've assembled a comprehensive toolkit:
- Hex key sets (metric and imperial)
- Precision screwdrivers and nut drivers
- Wire strippers and crimping tools
- Digital calipers for measurement
- 3D printers (PETG and TPU capable)
- Basic hand tools for prototyping

Safety First:
Every team member completes a safety orientation covering:
- Proper tool usage and maintenance
- Electrical safety with VEX components
- Workshop etiquette and cleanup procedures
- Emergency protocols and first aid basics

Testing Rigs:
We built several custom testing setups:
- Drivetrain endurance tester: Runs motors continuously to identify weak points
- Lift mechanism load tester: Measures force output at different gear ratios
- Intake stress test: Simulates repeated game object handling

Organization System:
All VEX parts are catalogued in a shared spreadsheet with photos and quantities. This makes inventory checks before competitions much easier.

Lessons Learned:
- Label everything from day one
- Invest in good storage solutions early
- Create a checkout system for shared tools
- Keep a "lessons learned" log for each test

Our workshop is more than just a space — it's where ideas become reality.`,
    date: "2026-06-28",
    readTime: "5 min",
  },
];

function ArticleMeta({ article }: { article: NewsArticle }) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={13} aria-hidden /> {article.date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={13} aria-hidden /> {article.readTime}
      </span>
    </div>
  );
}

export default function News() {
  const [featured, ...rest] = ARTICLES;
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <>
      <section id="news" className="section-pad relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 reveal">
            <p className="font-mono text-xs tracking-[0.3em] text-electric uppercase mb-3">
              Newsroom
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              NEWS &amp; <span className="text-gradient">BUILD LOGS</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Featured */}
            <article
              className="reveal relative lg:col-span-2 rounded-2xl hover-glow-border group cursor-pointer"
              onClick={() => setSelectedArticle(featured)}
            >
              <div className="h-full rounded-2xl bg-card p-8 md:p-10 flex flex-col justify-between gap-8 transition-colors group-hover:bg-graphite">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-mono text-electric">
                      {featured.category}
                    </span>
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-mono text-accent">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug mb-4 group-hover:text-gradient transition-all">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <ArticleMeta article={featured} />
                  <ArrowUpRight
                    className="text-electric transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={20}
                    aria-hidden
                  />
                </div>
              </div>
            </article>

            {/* Grid cards */}
            {rest.map((a, i) => (
              <article
                key={a.title}
                className="reveal glass rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors cursor-pointer group"
                data-reveal-delay={String((i + 1) * 90)}
                onClick={() => setSelectedArticle(a)}
              >
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-electric">
                  {a.category}
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-electric transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {a.excerpt}
                </p>
                <div className="mt-auto pt-2">
                  <ArticleMeta article={a} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Dialog */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 md:p-6 animate-fade-in-scale"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] glass-strong rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-mono text-electric mb-3">
                    {selectedArticle.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {selectedArticle.title}
                  </h3>
                  <div className="mt-3">
                    <ArticleMeta article={selectedArticle} />
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex-shrink-0 h-10 w-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="prose prose-invert max-w-none">
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                  // Check if it's a heading (ends with colon or is short and capitalized)
                  const isHeading = paragraph.endsWith(':') || (paragraph.length < 60 && paragraph === paragraph.toUpperCase());

                  if (isHeading) {
                    return (
                      <h4 key={idx} className="font-display text-xl font-semibold mt-6 mb-3 text-electric">
                        {paragraph}
                      </h4>
                    );
                  }

                  // Check if it's a list item
                  if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={idx} className="space-y-2 my-4 ml-4">
                        {items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                            <span className="text-electric mt-1.5">•</span>
                            <span>{item.replace(/^[-•]\s*|\d+\.\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Regular paragraph
                  return (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
