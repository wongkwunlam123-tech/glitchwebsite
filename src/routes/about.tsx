import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <DynamicBackground variant="about" minimal />

      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
