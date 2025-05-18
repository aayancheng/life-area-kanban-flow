
import React from "react";
import { Button } from "../ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Productivity?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who have improved their work-life balance with Life Kanban.
        </p>
        <Button 
          className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md text-lg transition-colors"
        >
          Create Your Free Account
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
