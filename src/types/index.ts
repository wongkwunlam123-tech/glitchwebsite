export interface StatItem {
  label: string;
  value: string;
  hint?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  section: string;
  skills: string[];
  vexExperience: string;
  awards: string;
  interests: string;
  photo: string;
}

export interface TimelineStep {
  year: string;
  title: string;
  description: string;
  status: "done" | "active" | "upcoming";
}

export interface Milestone {
  stage: string;
  progress: number;
  status: "done" | "active" | "upcoming";
  eta: string;
}

export interface NewsArticle {
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export interface SponsorTier {
  name: string;
  color: string;
  benefits: string[];
}

export interface AcademyTopic {
  category: string;
  topics: string[];
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface BudgetItem {
  category: string;
  amount: number;
  percentage: number;
  details: string[];
}

export interface RecruitmentPhase {
  phase: string;
  time: string;
  activities: string[];
  status: "upcoming" | "active" | "completed";
}

export interface SustainabilityGoal {
  year: string;
  goal: string;
  metrics: string[];
}

export interface AIFeature {
  name: string;
  description: string;
  technology: string;
  benefit: string;
}
