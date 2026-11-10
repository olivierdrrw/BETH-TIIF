export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  audience: "individual" | "institution";
  custom?: boolean;
}

export const plans: Plan[] = [

 {
  id: "free",
  name: "Free",
  monthlyPrice: 0,
  yearlyPrice: 0,
  audience: "individual",
  features: [
   "Basic Dashboard",
   "Goals",
   "Journal",
  ],
 },

 {
  id: "student",
  name: "Student Premium",
  monthlyPrice: 8,
  yearlyPrice: 80,
  audience: "individual",
  features: [
   "Everything in Free",
   "Human Twin",
   "AI Companion",
   "Discounted for students",
  ],
 },

 {
  id: "premium",
  name: "Premium",
  monthlyPrice: 19,
  yearlyPrice: 190,
  audience: "individual",
  features: [
   "Human Twin",
   "AI Companion",
   "Memory Vault",
   "Achievements",
  ],
 },

 {
  id: "family",
  name: "Family",
  monthlyPrice: 29,
  yearlyPrice: 290,
  audience: "individual",
  features: [
   "Everything in Premium",
   "Up to 5 family members",
   "Parent Dashboard",
   "Shared wellbeing check-ins",
  ],
 },

 {
  id: "professional",
  name: "Professional",
  monthlyPrice: 49,
  yearlyPrice: 490,
  audience: "individual",
  features: [
   "Advanced Analytics",
   "Coaching Tools",
   "Institution Access",
  ],
 },

 {
  id: "therapist_pro",
  name: "Therapist Pro",
  monthlyPrice: 79,
  yearlyPrice: 790,
  audience: "institution",
  features: [
   "Therapist Dashboard",
   "Client booking & scheduling",
   "Session notes",
   "Unlimited clients",
  ],
 },

 {
  id: "school",
  name: "School",
  monthlyPrice: 299,
  yearlyPrice: 2990,
  audience: "institution",
  features: [
   "School Dashboard",
   "Up to 500 students",
   "Cohort wellbeing analytics",
   "Priority support",
  ],
 },

 {
  id: "university",
  name: "University",
  monthlyPrice: 999,
  yearlyPrice: 9990,
  audience: "institution",
  features: [
   "Everything in School",
   "Unlimited students",
   "Research Dashboard access",
   "Dedicated account manager",
  ],
 },

 {
  id: "ngo",
  name: "NGO",
  monthlyPrice: 0,
  yearlyPrice: 0,
  audience: "institution",
  custom: true,
  features: [
   "Community Intelligence",
   "Population wellbeing analytics",
   "Custom pricing for nonprofits",
  ],
 },

 {
  id: "enterprise",
  name: "Enterprise",
  monthlyPrice: 0,
  yearlyPrice: 0,
  audience: "institution",
  custom: true,
  features: [
   "Organization Dashboard",
   "SSO & API access",
   "Custom integrations",
  ],
 },

 {
  id: "government",
  name: "Government",
  monthlyPrice: 0,
  yearlyPrice: 0,
  audience: "institution",
  custom: true,
  features: [
   "National Intelligence reporting",
   "Regional wellbeing analytics",
   "Compliance & data residency options",
  ],
 },

];
