import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Upload } from "lucide-react";

const CATEGORIES = ["All", "Team", "Robot", "Workshop", "Competition", "CAD Design"] as const;

interface GalleryItem {
  url: string;
  caption: string;
  category: (typeof CATEGORIES)[number];
}

const ITEMS: GalleryItem[] = [
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60&fm=webp", caption: "Team planning session before prototype review", category: "Team" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=60&fm=webp", caption: "PolyU robotics members working through design tradeoffs", category: "Team" },
  { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=60&fm=webp", caption: "Robot drivetrain prototype in early testing", category: "Robot" },
  { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=60&fm=webp", caption: "Mechanical assembly and integration workflow", category: "Robot" },
  { url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=60&fm=webp", caption: "Workshop bench setup for fabrication and tuning", category: "Workshop" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=60&fm=webp", caption: "Competition field setup and match preparation", category: "Competition" },
  { url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=60&fm=webp", caption: "CAD render for a drivetrain and intake concept", category: "CAD Design" },
  { url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=60&fm=webp", caption: "Design iteration and mechanism analysis in CAD", category: "CAD Design" },
];

function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 glass rounded-full p-2 text-foreground hover:text-electric transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <button
        className="absolute left-4 glass rounded-full p-3 text-foreground hover:text-electric transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        className="absolute right-4 glass rounded-full p-3 text-foreground hover:text-electric transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.url}
          alt={item.caption}
          className="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
        <div className="mt-4 text-center">
          <p className="text-sm text-foreground font-medium">{item.caption}</p>
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-mono text-electric">
            {item.category} · {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.category === active);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIndex((prev) => prev !== null ? (prev + 1) % filtered.length : null);

  return (
    <section id="gallery" className="section-pad bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-10 text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-electric uppercase">Visual Archive</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold">
            GALLERY
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Build sessions, competitions, CAD renders, and team moments.
          </p>
        </div>

        <div className="reveal flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                active === c
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <div
              key={item.url}
              className="reveal glass rounded-xl overflow-hidden group cursor-pointer hover-lift"
              data-reveal-delay={String((i % 4) * 80)}
              onClick={() => openLightbox(i)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="px-4 py-3 bg-card/60 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground">{item.caption}</p>
                <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono text-electric">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
