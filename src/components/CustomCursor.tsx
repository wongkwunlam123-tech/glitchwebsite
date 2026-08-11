import { useEffect, useRef } from "react";

interface Point { x: number; y: number; }

interface Normal { nx: number; ny: number; }

function catmullRom(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: 0.5 * (
      2 * p1.x +
      (-p0.x + p2.x) * t +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
    ),
    y: 0.5 * (
      2 * p1.y +
      (-p0.y + p2.y) * t +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
    ),
  };
}

function buildSmoothPath(pts: Point[], samplesPerSegment: number): Point[] {
  if (pts.length < 4) return pts;
  const out: Point[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < samplesPerSegment; s++) {
      out.push(catmullRom(p0, p1, p2, p3, s / samplesPerSegment));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function normalsOf(pts: Point[]): Normal[] {
  const n = pts.length;
  const out: Normal[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(n - 1, i + 1)];
    let dx = next.x - prev.x;
    let dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    out[i] = { nx: -dy, ny: dx };
  }
  return out;
}

function ribbonEdges(pts: Point[], normals: Normal[], widthAt: (t: number) => number) {
  const n = pts.length;
  const left: Point[] = new Array(n);
  const right: Point[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const t = n > 1 ? i / (n - 1) : 0;
    const w = widthAt(t) / 2;
    const { nx, ny } = normals[i];
    left[i] = { x: pts[i].x + nx * w, y: pts[i].y + ny * w };
    right[i] = { x: pts[i].x - nx * w, y: pts[i].y - ny * w };
  }
  return { left, right };
}

function fillRibbon(ctx: CanvasRenderingContext2D, left: Point[], right: Point[], style: string | CanvasGradient) {
  if (left.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
  ctx.closePath();
  ctx.fillStyle = style;
  ctx.fill();
}

const COLORS = [
  { r: 0, g: 255, b: 136 },   // Neon Green #00FF88
  { r: 0, g: 217, b: 255 },   // Electric Blue #00D9FF
  { r: 160, g: 32, b: 240 },  // Neon Purple #A020F0
];

function colorAt(t: number) {
  const n = COLORS.length;
  const normalized = ((t % n) + n) % n;
  const idx = Math.floor(normalized);
  const next = (idx + 1) % n;
  const frac = normalized - idx;
  const c1 = COLORS[idx];
  const c2 = COLORS[next];
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * frac),
    g: Math.round(c1.g + (c2.g - c1.g) * frac),
    b: Math.round(c1.b + (c2.b - c1.b) * frac),
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface GlitchBlock {
  x: number;
  y: number;
  nx: number;
  ny: number;
  w: number;
  h: number;
  offset: number;
  life: number;
  color: { r: number; g: number; b: number };
}

const NUM_STRANDS = 5;
const MAX_POINTS = 50;

function drawGlitchArrow(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, timestamp: number, reduceMotion: boolean) {
  const pulsePhase = timestamp * 0.004;
  const glowIntensity = 0.9 + Math.sin(pulsePhase) * 0.1;
  const s = size * 0.85;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.45); // Maximum tilt angle for dramatic curve

  // Standard cursor icon shape with notch tail and leaf gradient colors
  ctx.shadowColor = `rgba(0, 217, 255, ${glowIntensity})`;
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.moveTo(0, 0);                                    // tip (point)
  ctx.lineTo(s * 0.20, s * 0.32);                      // right side of arrowhead (0.20)
  ctx.lineTo(s * 0.10, s * 0.32);                      // inner right junction (0.10)
  ctx.lineTo(s * 0.10, s * 0.58);                      // shaft right edge (80% of original)
  ctx.lineTo(-s * 0.10, s * 0.58);                     // shaft left edge (80% of original)
  ctx.lineTo(-s * 0.10, s * 0.32);                     // inner left junction (0.10)
  ctx.lineTo(-s * 0.20, s * 0.32);                     // left side of arrowhead (0.20)
  ctx.closePath();

  // Leaf gradient fill - four color scheme
  const gradient = ctx.createLinearGradient(0, 0, 0, s * 0.58);
  gradient.addColorStop(0, "#00FF88");      // Neon Green at tip
  gradient.addColorStop(0.3, "#00D9FF");    // Electric Blue in middle
  gradient.addColorStop(0.7, "#3B82F6");    // Royal Blue lower
  gradient.addColorStop(1, "#A020F0");      // Neon Purple at tail
  ctx.fillStyle = gradient;
  ctx.fill();

  // White edge highlight for definition
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.shadowBlur = 0;

  // Floating particles
  if (!reduceMotion) {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + timestamp * 0.003;
      const radius = s * 0.45 + Math.sin(timestamp * 0.005 + i * 1.1) * 5;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius + s * 0.35;
      const alpha = 0.3 + Math.sin(timestamp * 0.007 + i * 0.8) * 0.2;

      const colors = ["#00FF88", "#00D9FF", "#3B82F6", "#A020F0"];
      ctx.fillStyle = colors[i % 4] + Math.round(alpha * 255).toString(16).padStart(2, "0");
      ctx.shadowColor = colors[i % 4];
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(px, py, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  // Scanning line
  if (!reduceMotion) {
    const scanY = ((timestamp * 0.05) % (s * 0.85)) + s * 0.03;
    ctx.strokeStyle = "rgba(0, 229, 255, 0.25)";
    ctx.lineWidth = 1;
    ctx.shadowColor = "rgba(0, 229, 255, 0.4)";
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(-s * 0.35, scanY);
    ctx.lineTo(s * 0.35, scanY);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.restore();
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointerQuery.matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const points: Point[] = Array.from({ length: MAX_POINTS }, () => ({ ...start }));
    const mouse = { x: start.x, y: start.y };
    let hasMoved = false;
    let speed = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hasMoved = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const glitches: GlitchBlock[] = [];

    const animate = (timestamp: number) => {
      // Instant head following - matches mouse speed exactly
      points[0].x = mouse.x;
      points[0].y = mouse.y;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        // Slower trail follow for longer persistence (reduced from 0.75 to 0.55)
        curr.x += (prev.x - curr.x) * 0.55;
        curr.y += (prev.y - curr.y) * 0.55;
      }

      const headDelta = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      speed += (headDelta - speed) * 0.25;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!hasMoved) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.globalCompositeOperation = "lighter";

      const activeLength = Math.round(Math.min(MAX_POINTS, Math.max(10, 12 + speed * 0.8)));
      const active = points.slice(0, activeLength);
      const smooth = buildSmoothPath(active, 3);
      const normals = normalsOf(smooth);
      const n = smooth.length;
      const head = smooth[0];
      const tail = smooth[n - 1];
      const speedNorm = Math.min(1, speed / 40);
      const phase = timestamp * 0.00045;

      // soft ambient glow backdrop
      const glowWidthAt = (t: number) => (10 + speedNorm * 6) * Math.pow(1 - t, 1.7) + 2;
      const glowEdges = ribbonEdges(smooth, normals, glowWidthAt);
      const glowGrad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
      for (let s = 0; s <= 6; s++) {
        const t = s / 6;
        const c = colorAt(t * 1.4 + phase);
        glowGrad.addColorStop(t, `rgba(${c.r},${c.g},${c.b},${(1 - t) * 0.22})`);
      }
      ctx.shadowColor = "rgba(0,217,255,0.5)";
      ctx.shadowBlur = 18;
      fillRibbon(ctx, glowEdges.left, glowEdges.right, glowGrad);
      ctx.shadowBlur = 0;

      // braided strands — this is what reads as "dragon" instead of a flat tube
      for (let s = 0; s < NUM_STRANDS; s++) {
        const freq = 2.0 + s * 0.45;
        const strandPhase = s * ((Math.PI * 2) / NUM_STRANDS) + timestamp * 0.0016;
        const wobbleAmp = 7 + speedNorm * 16;
        const perturbed: Point[] = new Array(n);
        for (let i = 0; i < n; i++) {
          const t = i / (n - 1);
          const hump = Math.sin(Math.PI * t); // 0 at head & tail, peak mid-trail
          const lateral = Math.sin(t * freq * Math.PI + strandPhase) * wobbleAmp * hump;
          const { nx, ny } = normals[i];
          perturbed[i] = { x: smooth[i].x + nx * lateral, y: smooth[i].y + ny * lateral };
        }
        const strandNormals = normalsOf(perturbed);
        const strandWidthAt = (t: number) => lerp(3.4, 0.3, t) * (0.7 + speedNorm * 0.5);
        const edges = ribbonEdges(perturbed, strandNormals, strandWidthAt);
        const grad = ctx.createLinearGradient(perturbed[0].x, perturbed[0].y, perturbed[n - 1].x, perturbed[n - 1].y);
        for (let st = 0; st <= 6; st++) {
          const t = st / 6;
          const c = colorAt(t * 1.5 + phase + s * 0.35);
          const alpha = Math.pow(1 - t, 1.15) * 0.62;
          grad.addColorStop(t, `rgba(${c.r},${c.g},${c.b},${alpha})`);
        }
        fillRibbon(ctx, edges.left, edges.right, grad);
      }

      // bright core spark down the centerline
      const coreWidthAt = (t: number) => lerp(2.2, 0.1, t);
      const coreEdges = ribbonEdges(smooth, normals, coreWidthAt);
      const coreGrad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
      for (let s = 0; s <= 4; s++) {
        const t = s / 4;
        const c = colorAt(t * 1.2 + phase);
        const r = Math.min(255, c.r + 150);
        const g = Math.min(255, c.g + 150);
        const b = Math.min(255, c.b + 150);
        coreGrad.addColorStop(t, `rgba(${r},${g},${b},${(1 - t) * 0.85})`);
      }
      fillRibbon(ctx, coreEdges.left, coreEdges.right, coreGrad);

      // chunky glitch blocks fused with the trail - use trail colors and positions
      // Speed-based generation: faster movement = more glitches (increased rates)
      const speedThreshold = Math.min(1, speedNorm * 2.5); // 0 to 1 based on speed
      const glitchChance = 0.2 + speedThreshold * 0.4; // 20% base, up to 60% at max speed
      const maxGlitches = 10 + Math.floor(speedThreshold * 15); // 10 to 25 max glitches

      if (!reduceMotion && Math.random() < glitchChance && glitches.length < maxGlitches) {
        // Pick a position along the trail (biased towards middle where trail is thicker)
        const trailPos = 0.2 + Math.random() * 0.6; // 20%-80% along trail
        const idx = Math.floor(trailPos * (n - 1));
        const p = smooth[idx];
        const { nx, ny } = normals[idx];

        // Use the exact trail color at this position for seamless fusion
        const t = trailPos;
        const c = colorAt(t * 1.4 + phase);

        // Size scales with speed but stays small
        const sizeMultiplier = 0.4 + speedThreshold * 0.5;
        glitches.push({
          x: p.x,
          y: p.y,
          nx,
          ny,
          w: (6 + Math.random() * 12) * sizeMultiplier,
          h: (2 + Math.random() * 3) * sizeMultiplier,
          offset: (Math.random() - 0.5) * 6 * (1 + speedThreshold * 0.4),
          life: 0.8 + speedThreshold * 0.2, // Longer life at higher speeds
          color: c, // Use trail color for fusion
        });
      }
      for (let i = glitches.length - 1; i >= 0; i--) {
        const g = glitches[i];
        g.life -= 0.05;
        if (g.life <= 0) {
          glitches.splice(i, 1);
          continue;
        }
        const ox = g.x + g.nx * g.offset;
        const oy = g.y + g.ny * g.offset;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(Math.atan2(g.ny, g.nx));
        ctx.fillStyle = `rgba(${g.color.r},${g.color.g},${g.color.b},${g.life * 0.8})`;
        ctx.fillRect(-g.h / 2, -g.w / 2, g.h, g.w);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";

      // Draw the Glitch arrow head on top
      drawGlitchArrow(ctx, head.x, head.y, 32, timestamp, reduceMotion);

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed pointer-events-none inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
