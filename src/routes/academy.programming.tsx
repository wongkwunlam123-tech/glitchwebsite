import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cpu, Gauge, Radar, Route as RouteIcon, Zap, Bug, Download, Play, RotateCcw, CheckCircle2, AlertTriangle, Award, Lock, Code2 } from "lucide-react";

export const Route = createFileRoute("/academy/programming")({ component: ProgrammingPage });

const MODULES = [
  { Icon: Cpu, title: "PROS / VEXcode Fundamentals", desc: "C++ project structure, V5 brain architecture, motor & sensor APIs." },
  { Icon: Gauge, title: "Motion Control", desc: "PID controllers, odometry localization, and kinematics for precise movement." },
  { Icon: Radar, title: "Sensor Fusion", desc: "Combining IMU, rotation, and vision data for robust state estimation." },
  { Icon: RouteIcon, title: "Autonomous Programming", desc: "Path planning, finite state machines, and match-ready routines." },
];

const CHECKLIST = [
  { step: "Set Ki = 0, Kd = 0. Increase Kp until robot responds quickly but doesn't oscillate.", hint: "Start with Kp = 0.5 and double/halve until stable" },
  { step: "Add Kd to dampen overshoot. Increase until oscillations stop without slowing response too much.", hint: "Kd is typically 10-50× smaller than Kp" },
  { step: "Add small Ki to eliminate remaining steady-state error. Watch for windup — add integral clamp!", hint: "Ki is usually 100-1000× smaller than Kp" },
];

const BUGS = [
  { symptom: "ROBOT OSCILLATES WILDLY", cause: "Kp too high or Kd too low", fix: "Reduce Kp by 50%, increase Kd", detail: "When Kp is too aggressive, the robot overshoots and oscillates around the target. Try reducing Kp to 0.75× current value and increasing Kd to dampen the response." },
  { symptom: "ROBOT NEVER REACHES TARGET", cause: "Ki = 0 or integral windup", fix: "Add small Ki, implement anti-windup clamp", detail: "Without integral action, steady-state error persists. Add Ki ≈ Kp/100 with a clamp of ±100 to prevent windup during saturation." },
  { symptom: "SLOW RESPONSE, NO OVERSHOOT", cause: "Kp too low", fix: "Double Kp incrementally", detail: "Conservative Kp values result in sluggish response. Double Kp every iteration until you see slight overshoot, then back off by 20%." },
  { symptom: "OVERSHOOT THEN SLOW SETTLE", cause: "Kd too low", fix: "Increase Kd by 25-50%", detail: "Insufficient derivative damping allows overshoot. Increase Kd gradually — it should be roughly 10-30× smaller than Kp for optimal damping." },
];

const ACHIEVEMENTS = [
  { name: "PID Master", desc: "Tune a perfect PID loop", unlocked: false, icon: Award },
  { name: "Sensor Guru", desc: "Integrate 5+ sensors", unlocked: false, icon: Radar },
  { name: "Auto Wizard", desc: "Complete autonomous routine", unlocked: false, icon: Zap },
];

const PID_CODE = `// Glitch's battle-tested PROS C++ PID controller
#include "pros/motors.hpp"

class PIDController {
public:
  double kp, ki, kd;
  double integral = 0, lastError = 0;
  double integralClamp = 100; // anti-windup

  PIDController(double kp, double ki, double kd) : kp(kp), ki(ki), kd(kd) {}

  double compute(double target, double current, double dt, double feedforward = 0) {
    double error = target - current;
    integral += error * dt;
    if (integral > integralClamp) integral = integralClamp;
    if (integral < -integralClamp) integral = -integralClamp;
    double derivative = (error - lastError) / dt;
    lastError = error;
    return kp * error + ki * integral + kd * derivative + feedforward;
  }

  void reset() { integral = 0; lastError = 0; }
};
`;

function runPidSim(kp: number, ki: number, kd: number, target: number, steps: number): number[] {
  const pts: number[] = [];
  let pos = 50;
  let integral = 0;
  let lastErr = 0;
  for (let i = 0; i < steps; i++) {
    pts.push(pos);
    const error = target - pos;
    integral += error * 0.03;
    integral = Math.max(-100, Math.min(100, integral));
    const derivative = error - lastErr;
    lastErr = error;
    const output = kp * error + ki * integral + kd * derivative;
    pos = Math.max(0, Math.min(100, pos + output * 0.02));
  }
  return pts;
}

function ProgrammingPage() {
  const [kp, setKp] = useState(1.5);
  const [ki, setKi] = useState(0.3);
  const [kd, setKd] = useState(0.5);
  const [target, setTarget] = useState(70);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(50);
  const [yourPath, setYourPath] = useState<number[]>([50]);
  const integralRef = useRef(0);
  const lastErrRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const pathRef = useRef<number[]>([50]);

  const lowKpPath = runPidSim(Math.max(0.1, kp * 0.2), 0, 0, target, 200);
  const highKpPath = runPidSim(kp * 2.5, 0, 0, target, 200);
  const dampedPath = runPidSim(kp, 0, kd * 2, target, 200);

  const startSim = useCallback(() => {
    if (playing) return;
    setPlaying(true);
    integralRef.current = 0;
    lastErrRef.current = 0;
    pathRef.current = [progress];
    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        const error = target - p;
        integralRef.current += error * 0.03;
        integralRef.current = Math.max(-100, Math.min(100, integralRef.current));
        const derivative = error - lastErrRef.current;
        lastErrRef.current = error;
        const output = kp * error + ki * integralRef.current + kd * derivative;
        const next = Math.max(0, Math.min(100, p + output * 0.02));
        pathRef.current.push(next);
        setYourPath([...pathRef.current]);
        if (Math.abs(target - next) < 1 && timerRef.current) {
          clearInterval(timerRef.current);
          setPlaying(false);
        }
        return next;
      });
    }, 30);
  }, [playing, target, kp, ki, kd, progress]);

  const resetSim = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPlaying(false);
    setProgress(50);
    setYourPath([50]);
    pathRef.current = [50];
    integralRef.current = 0;
    lastErrRef.current = 0;
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const downloadCode = () => {
    const blob = new Blob([PID_CODE], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pid_controller.cpp";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toSvgY = (val: number) => 240 - (val / 100) * 220;
  const toSvgX = (i: number) => 20 + (i / 199) * 680;
  const makeD = (pts: number[]) => pts.map((v, i) => `${i === 0 ? "M" : "L"}${toSvgX(i)},${toSvgY(v)}`).join(" ");

  return (
    <div className="space-y-14">
      <section className="mx-auto max-w-5xl px-6">
          <div className="reveal mb-10">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">ACADEMY</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">PROGRAMMING <span className="text-gradient">TRACK</span></h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">A structured VEX U programming path — from your first line of C++ to competition-grade autonomous systems.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {MODULES.map((m, i) => (
              <div key={m.title} className="reveal glass rounded-xl p-6 hover-lift group" data-reveal-delay={String(i * 80)}>
                <m.Icon className="h-8 w-8 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:text-electric" strokeWidth={1.5} />
                <h3 className="font-display font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Challenges - Achievements */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="reveal mb-8 glass rounded-xl p-6">
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-electric" />
              Code Challenges
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((achievement, i) => (
                <div key={achievement.name} className={`glass rounded-lg p-4 text-center transition-all duration-300 ${achievement.unlocked ? 'border border-primary/50 bg-primary/10' : 'opacity-50 hover:opacity-70'}`} data-reveal-delay={String(i * 100)}>
                  {achievement.unlocked ? (
                    <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  ) : (
                    <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  )}
                  <p className="font-semibold text-sm mb-1">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PID Simulator */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="reveal glass-strong rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">Interactive PID Simulator</h2>

            {/* SVG chart */}
            <div
              className="relative rounded-xl border border-border bg-secondary/30 overflow-hidden cursor-crosshair select-none"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const t = Math.round(100 - ((e.clientY - rect.top) / rect.height) * 100);
                setTarget(Math.max(5, Math.min(95, t)));
              }}
            >
              <svg viewBox="0 0 720 260" className="w-full h-auto block" style={{ maxHeight: 320 }}>
                {/* grid lines */}
                {[0, 25, 50, 75, 100].map((v) => (
                  <line key={v} x1={20} y1={toSvgY(v)} x2={700} y2={toSvgY(v)} stroke="var(--color-border)" strokeWidth={0.5} opacity={0.4} />
                ))}
                {[0, 50, 100, 150, 200].map((i) => (
                  <line key={i} x1={toSvgX(i)} y1={10} x2={toSvgX(i)} y2={250} stroke="var(--color-border)" strokeWidth={0.5} opacity={0.4} />
                ))}
                {/* reference curves */}
                <path d={makeD(lowKpPath)} fill="none" stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.6} />
                <path d={makeD(highKpPath)} fill="none" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.6} />
                <path d={makeD(dampedPath)} fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.6} />
                {/* target line */}
                <line x1={20} y1={toSvgY(target)} x2={700} y2={toSvgY(target)} stroke="var(--color-muted-foreground)" strokeWidth={1} strokeDasharray="8 4" opacity={0.5} />
                <text x={690} y={toSvgY(target) - 6} textAnchor="end" fill="var(--color-muted-foreground)" fontSize={10} fontFamily="monospace">TARGET</text>
                {/* Your PID curve */}
                <path d={makeD(yourPath)} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                {/* ball at current position */}
                <circle cx={toSvgX(yourPath.length - 1)} cy={toSvgY(progress)} r={8} fill="var(--color-primary)" filter="url(#glow)" />
                <defs>
                  <filter id="glow"><feGaussianBlur stdDeviation={3} result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
              </svg>
              {/* legend overlay */}
              <div className="absolute top-3 left-3 glass rounded-lg p-3 text-xs space-y-1 pointer-events-none">
                <p className="flex items-center gap-2"><span className="h-0.5 w-4 bg-primary rounded" /> Your PID</p>
                <p className="flex items-center gap-2 text-muted-foreground"><span className="h-0.5 w-4 border-t border-dashed border-cyan-400" /> Low Kp (slow)</p>
                <p className="flex items-center gap-2 text-muted-foreground"><span className="h-0.5 w-4 border-t border-dashed border-pink-400" /> High Kp (oscillate)</p>
                <p className="flex items-center gap-2 text-muted-foreground"><span className="h-0.5 w-4 border-t border-dashed border-amber-400" /> With Kd (damped)</p>
              </div>
            </div>

            {/* buttons */}
            <div className="mt-5 flex justify-center gap-4">
              <button onClick={startSim} disabled={playing} className="btn-gradient-animated inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"><Play className="h-4 w-4 icon-rotate-on-hover" /> Play Animation</button>
              <button onClick={resetSim} className="btn-glass-animated glass inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold"><RotateCcw className="h-4 w-4 icon-rotate-on-hover" /> Reset</button>
            </div>

            {/* sliders */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[{ label: "Kp", val: kp, set: setKp, max: 5, cls: "text-electric" }, { label: "Ki", val: ki, set: setKi, max: 2, cls: "text-pink-400" }, { label: "Kd", val: kd, set: setKd, max: 2, cls: "text-red-400" }].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4">
                  <div className="flex justify-between mb-2"><span className={`font-display font-bold ${s.cls}`}>{s.label}</span><span className="font-mono text-sm">{s.val.toFixed(2)}</span></div>
                  <input type="range" min={0} max={s.max} step={0.1} value={s.val} onChange={(e) => s.set(Number(e.target.value))} className="w-full accent-primary" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analogy + Math */}
        <section className="mx-auto max-w-5xl px-6 space-y-6">
          <div className="reveal glass rounded-2xl p-8 flex gap-5">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"><Cpu className="h-6 w-6 text-primary" /></div>
            <div>
              <h3 className="font-display text-xl font-semibold mb-3">PID Control Analogy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Think of PID like cruise control in a car. The Proportional (P) term is how hard you press the gas when you're far from your target speed. The Integral (I) term accounts for accumulated error over time. The Derivative (D) term predicts future error based on the current rate of change.</p>
            </div>
          </div>
          <div className="reveal glass rounded-2xl p-8 flex gap-5" data-reveal-delay="80">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"><Zap className="h-6 w-6 text-primary" /></div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold mb-3">The Math Equation</h3>
              <p className="font-mono bg-secondary/50 rounded-lg p-4 text-sm mb-4">output = Kp × error + Ki × ∫error·dt + Kd × d(error)/dt</p>
              <p className="text-sm text-muted-foreground mb-2">Where:</p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                <li>• Kp (Proportional Gain): Reacts to current error</li>
                <li>• Ki (Integral Gain): Eliminates steady-state error</li>
                <li>• Kd (Derivative Gain): Dampens oscillations</li>
              </ul>
              <p className="text-sm text-muted-foreground">In PROS C++ API, use <span className="font-mono text-electric">pros::Motor::move_velocity()</span> with custom PID loops or <span className="font-mono text-electric">set_pos_pid()</span>/<span className="font-mono text-electric">set_vel_pid()</span>.</p>
            </div>
          </div>
        </section>

        {/* Tuning Checklist */}
        <section className="mx-auto max-w-5xl px-6">
          <h2 className="reveal font-display text-3xl font-bold text-center mb-8">PID <span className="text-gradient">Tuning Checklist</span></h2>
          <div className="space-y-4">
            {CHECKLIST.map((c, i) => (
              <div key={i} className="reveal glass rounded-xl p-6 flex gap-4" data-reveal-delay={String(i * 80)}>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                <div>
                  <p className="font-medium mb-1">{c.step}</p>
                  <p className="font-mono text-xs text-muted-foreground">› {c.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Bugs */}
        <section className="mx-auto max-w-5xl px-6">
          <h2 className="reveal font-display text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3"><Bug className="h-7 w-7 text-pink-400" /> Common Bugs &amp; Fixes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BUGS.map((b, i) => (
              <div key={b.symptom} className="reveal glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 cursor-pointer" data-reveal-delay={String(i * 80)}>
                <p className="text-red-400 font-bold text-sm tracking-wide mb-3">SYMPTOM: {b.symptom}</p>
                <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold text-foreground">Cause:</span> {b.cause}</p>
                <p className="text-sm text-electric mb-3"><span className="font-semibold">Fix:</span> {b.fix}</p>

                {/* Expandable detail on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300">
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Template Download */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="reveal text-center mb-8">
            <Download className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-3">Glitch's PID Code Template</h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">Download our battle-tested PROS C++ PID implementation with anti-windup, feedforward, and configurable gains.</p>
            <button onClick={downloadCode} className="btn-gradient-animated inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-7 py-3 text-sm font-semibold text-primary-foreground"><Download className="h-4 w-4 icon-rotate-on-hover" /> Download PID Template (.cpp)</button>
          </div>

          {/* Syntax-highlighted code block */}
          <div className="reveal glass-strong rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-electric" />
                <span className="font-mono text-sm text-muted-foreground">pid_controller.cpp</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
            </div>
            <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed">
              <code className="block">
                <span className="text-muted-foreground">// Glitch's battle-tested PROS C++ PID controller</span>{"\n"}
                <span className="text-pink-400">#include</span> <span className="text-green-400">"pros/motors.hpp"</span>{"\n\n"}
                <span className="text-blue-400">class</span> <span className="text-yellow-300">PIDController</span> {"{"}{"\n"}
                <span className="text-blue-400">public:</span>{"\n"}
                {"  "}<span className="text-blue-400">double</span> kp, ki, kd;{"\n"}
                {"  "}<span className="text-blue-400">double</span> integral = <span className="text-orange-400">0</span>, lastError = <span className="text-orange-400">0</span>;{"\n"}
                {"  "}<span className="text-blue-400">double</span> integralClamp = <span className="text-orange-400">100</span>; <span className="text-muted-foreground">// anti-windup</span>{"\n\n"}
                {"  "}<span className="text-yellow-300">PIDController</span>(<span className="text-blue-400">double</span> kp, <span className="text-blue-400">double</span> ki, <span className="text-blue-400">double</span> kd) : kp(kp), ki(ki), kd(kd) {"{}"}{"\n\n"}
                {"  "}<span className="text-blue-400">double</span> <span className="text-yellow-300">compute</span>(<span className="text-blue-400">double</span> target, <span className="text-blue-400">double</span> current, <span className="text-blue-400">double</span> dt, <span className="text-blue-400">double</span> feedforward = <span className="text-orange-400">0</span>) {"{"}{"\n"}
                {"    "}<span className="text-blue-400">double</span> error = target - current;{"\n"}
                {"    "}integral += error * dt;{"\n"}
                {"    "}<span className="text-blue-400">if</span> (integral &gt; integralClamp) integral = integralClamp;{"\n"}
                {"    "}<span className="text-blue-400">if</span> (integral &lt; -integralClamp) integral = -integralClamp;{"\n"}
                {"    "}<span className="text-blue-400">double</span> derivative = (error - lastError) / dt;{"\n"}
                {"    "}lastError = error;{"\n"}
                {"    "}<span className="text-blue-400">return</span> kp * error + ki * integral + kd * derivative + feedforward;{"\n"}
                {"  "}{"}"}{"\n\n"}
                {"  "}<span className="text-blue-400">void</span> <span className="text-yellow-300">reset</span>() {"{"} integral = <span className="text-orange-400">0</span>; lastError = <span className="text-orange-400">0</span>; {"}"}{"\n"}
                {"}"};
              </code>
            </pre>
          </div>
        </section>
    </div>
  );
}
