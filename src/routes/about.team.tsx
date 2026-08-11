import { createFileRoute } from "@tanstack/react-router";
import Team from "@/components/Team";

export const Route = createFileRoute("/about/team")({
  component: TeamPage,
});

function TeamPage() {
  return <Team />;
}
