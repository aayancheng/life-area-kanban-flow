
import React from "react";

interface Instruction {
  step: string;
  description: string;
}

interface HowItWorksSectionProps {
  instructions: Instruction[];
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ instructions }) => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Life Kanban Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple visual system to help you organize and balance all areas of your life
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Kanban Board Image */}
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
  );
};

export default HowItWorksSection;
