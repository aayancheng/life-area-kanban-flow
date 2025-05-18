
import { Testimonial, Benefit, Instruction } from './types';

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Thompson",
    title: "Product Manager",
    quote: "Life Kanban transformed my workflow. I can finally manage my personal and professional goals in one place, with a beautiful visual system that keeps me motivated.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Michael Rodriguez",
    title: "Software Engineer",
    quote: "As someone who always has multiple projects going on, Life Kanban has been a game-changer. The ability to categorize by life areas helps me maintain balance.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Emily Chen",
    title: "Health Coach",
    quote: "I recommend Life Kanban to all my clients who struggle with work-life balance. The visual flow between health, family, creativity, and future planning is brilliant.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

export const benefits: Benefit[] = [
  {
    title: "Life Balance",
    description: "Organize tasks across key life areas to ensure you're giving attention to what matters most.",
    icon: "🧘",
  },
  {
    title: "Visual Progress",
    description: "See your goals moving across your board, providing motivation and clarity on what's next.",
    icon: "📊",
  },
  {
    title: "Future Planning",
    description: "Keep track of goals for the future without cluttering your current focus areas.",
    icon: "🔮",
  },
  {
    title: "Achievement Tracking",
    description: "Build confidence by watching your completed tasks accumulate over time.",
    icon: "🏆",
  },
];

export const instructions: Instruction[] = [
  {
    step: "Create Goals",
    description: "Add your goals and aspirations to any of the four life areas",
  },
  {
    step: "Organize & Prioritize",
    description: "Move cards between Health, Family, Create, and Parking columns",
  },
  {
    step: "Track Progress",
    description: "Update progress on each goal as you work towards completion",
  },
  {
    step: "Add Resources",
    description: "Attach YouTube videos and helpful links to support your journey",
  },
  {
    step: "Review & Adjust",
    description: "Regularly review your board and adjust priorities as needed",
  },
];
