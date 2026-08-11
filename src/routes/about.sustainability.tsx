import { createFileRoute } from "@tanstack/react-router";
import SustainabilityRoadmap from "@/components/SustainabilityRoadmap";

export const Route = createFileRoute("/about/sustainability")({
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return <SustainabilityRoadmap />;
}
