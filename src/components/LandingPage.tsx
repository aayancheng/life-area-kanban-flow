
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Import section components
import HeroSection from "./landing/HeroSection";
import HowItWorksSection from "./landing/HowItWorksSection";
import BenefitsSection from "./landing/BenefitsSection";
import TestimonialsSection from "./landing/TestimonialsSection";
import CtaSection from "./landing/CtaSection";
import Footer from "./landing/Footer";

// Import data
import { testimonials, benefits, instructions } from "./landing/data";

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works Section */}
      <HowItWorksSection instructions={instructions} />
      
      {/* Benefits Section */}
      <BenefitsSection benefits={benefits} />
      
      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />
      
      {/* CTA Section */}
      <CtaSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
