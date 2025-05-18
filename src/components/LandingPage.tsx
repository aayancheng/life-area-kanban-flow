
import React from "react";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const testimonials = [
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

  const benefits = [
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

  const instructions = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Content */}
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Prioritize Your Life with{" "}
                <span className="text-blue-600">Life Kanban</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Life Kanban helps you bring balance to all areas of your life by
                organizing your goals and tasks into a visual flow system.
              </p>
            </div>

            {/* Auth Form */}
            <div className="lg:w-1/2 w-full max-w-md">
              <AuthForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (NEW) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Life Kanban Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple visual system to help you organize and balance all areas of your life
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Kanban Board Image - UPDATED WITH NEW IMAGE PATH */}
            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/21bbf714-1417-432c-a013-8e8203a06305.png" 
                  alt="Life Kanban Board Example" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Instructions List */}
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Getting Started is Easy</h3>
              <ul className="space-y-4">
                {instructions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.step}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Use Life Kanban?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A holistic approach to organizing your goals across all important areas of your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm transition-transform hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who have transformed their productivity with Life Kanban.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <p className="italic text-gray-700">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their work-life balance with Life Kanban.
          </p>
          <button
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md text-lg transition-colors"
          >
            Create Your Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Life Kanban. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
