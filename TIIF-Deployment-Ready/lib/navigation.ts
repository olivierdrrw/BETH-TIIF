import {
    LayoutDashboard,
    Brain,
    ShieldAlert,
    BookOpen,
    Music,
    Users,
    Calendar,
    Video,
    School,
    Building2,
    BarChart3,
    Heart,
    Bot,
    GraduationCap,
    Store,
    Settings,
  } from "lucide-react";
  
  export const navigation = [
    {
      title: "Executive Dashboard",
      items: [
        {
          label: "Overview",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Analytics",
          href: "/dashboard/analytics",
          icon: BarChart3,
        },
      ],
    },
  
    {
      title: "AI Intelligence",
      items: [
        {
          label: "AI Companion",
          href: "/dashboard/ai-companion",
          icon: Brain,
        },
        {
          label: "AI Avatar",
          href: "/dashboard/ai-avatar",
          icon: Bot,
        },
        {
          label: "Early Warning",
          href: "/dashboard/warnings",
          icon: ShieldAlert,
        },
      ],
    },
  
    {
      title: "Wellness Hub",
      items: [
        {
          label: "AI Journal",
          href: "/dashboard/journal",
          icon: BookOpen,
        },
        {
          label: "Meditation",
          href: "/dashboard/meditation",
          icon: Heart,
        },
        {
          label: "Calm Music",
          href: "/dashboard/music",
          icon: Music,
        },
      ],
    },
  
    {
      title: "Therapy & Care",
      items: [
        {
          label: "Therapists",
          href: "/dashboard/therapists",
          icon: Users,
        },
        {
          label: "Appointments",
          href: "/dashboard/appointments",
          icon: Calendar,
        },
        {
          label: "Video Therapy",
          href: "/dashboard/video-therapy",
          icon: Video,
        },
      ],
    },
  
    {
      title: "Schools & Institutions",
      items: [
        {
          label: "Schools",
          href: "/dashboard/schools",
          icon: School,
        },
        {
          label: "Universities",
          href: "/dashboard/universities",
          icon: GraduationCap,
        },
        {
          label: "Government",
          href: "/dashboard/government",
          icon: Building2,
        },
      ],
    },
  
    {
      title: "Platform",
      items: [
        {
          label: "Marketplace",
          href: "/dashboard/marketplace",
          icon: Store,
        },
        {
          label: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];