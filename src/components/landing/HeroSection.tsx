
import React from "react";
import AuthForm from "../AuthForm";

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;
