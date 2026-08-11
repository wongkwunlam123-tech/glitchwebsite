import { createFileRoute } from "@tanstack/react-router";
import Achievements from "@/components/Achievements";

export const Route = createFileRoute("/about/awards")({
  component: AwardsPage,
});

function AwardsPage() {
  return <Achievements />;
}
