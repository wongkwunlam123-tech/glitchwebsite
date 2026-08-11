import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import { Camera, Image as ImageIcon, Maximize2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

const CATEGORIES = ["All", "Team", "Robot", "CAD", "Competition"] as const;

type Category = typeof CATEGORIES[number];

interface GalleryItem {
  id: number;
  category: Category;
  title: string;
  desc: string;
  image?: string;
  color: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: "Team", title: "Founding Team", desc: "GLITCH Robotics founding members at PolyU", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", color: "from-primary/30 to-electric/20" },
  { id: 2, category: "Robot", title: "Chassis Assembly", desc: "Drivetrain integration and testing", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", color: "from-electric/30 to-accent/20" },
  { id: 3, category: "CAD", title: "Initial Design", desc: "First CAD render of competition robot", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80", color: "from-accent/30 to-primary/20" },
  { id: 4, category: "Competition", title: "Match Day", desc: "VEX U regional qualifier preparation", image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80", color: "from-primary/30 to-accent/20" },
  { id: 5, category: "Robot", title: "Sensor Array", desc: "Multi-sensor fusion system integration", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", color: "from-electric/30 to-primary/20" },
  { id: 6, category: "Team", title: "Workshop Session", desc: "Weekly engineering workshop at PolyU lab", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80", color: "from-accent/30 to-electric/20" },
  { id: 7, category: "CAD", title: "Manipulator Arm", desc: "End-effector design iteration v3", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80", color: "from-primary/30 to-electric/20" },
  { id: 8, category: "Competition", title: "Pit Area", desc: "Pre-match robot inspection and tuning", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", color: "from-electric/30 to-accent/20" },
  { id: 9, category: "Robot", title: "Final Assembly", desc: "Complete robot ready for competition", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80", color: "from-accent/30 to-primary/20" },
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="gallery" minimal />

      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <section className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-10">
            <p className="font-mono text-xs tracking-[0.35em] text-electric mb-3">VISUAL ARCHIVE</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              <span className="text-gradient">GALLERY</span>
            </h1>
          </div>

          {/* Category Filter */}
          <div className="reveal flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 scale-105 ring-2 ring-primary/50"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid - Fixed third row cutoff with proper spacing */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="reveal group relative aspect-[4/3] glass rounded-xl overflow-hidden cursor-pointer hover-lift transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/40"
                data-reveal-delay={String(i * 60)}
                onClick={() => setLightboxItem(item)}
              >
                {/* Real image or fallback gradient */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.category === "CAD" ? (
                        <Maximize2 className="h-12 w-12 text-foreground/30 group-hover:text-foreground/50 transition-colors" strokeWidth={1} />
                      ) : item.category === "Robot" ? (
                        <ImageIcon className="h-12 w-12 text-foreground/30 group-hover:text-foreground/50 transition-colors" strokeWidth={1} />
                      ) : (
                        <Camera className="h-12 w-12 text-foreground/30 group-hover:text-foreground/50 transition-colors" strokeWidth={1} />
                      )}
                    </div>
                  </>
                )}

                {/* Overlay info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-mono text-[10px] tracking-wider text-electric mb-1">{item.category.toUpperCase()}</p>
                  <h3 className="font-display font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No photos in this category yet.</p>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-6 animate-fade-in-scale"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-3xl w-full glass-strong rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.image ? (
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className={`aspect-video bg-gradient-to-br ${lightboxItem.color} relative`}>
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-20 w-20 text-foreground/20" strokeWidth={1} />
                </div>
              </div>
            )}
            <div className="p-6">
              <p className="font-mono text-xs tracking-wider text-electric mb-2">{lightboxItem.category.toUpperCase()}</p>
              <h3 className="font-display text-xl font-bold mb-2">{lightboxItem.title}</h3>
              <p className="text-muted-foreground text-sm">{lightboxItem.desc}</p>
            </div>
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full glass flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
