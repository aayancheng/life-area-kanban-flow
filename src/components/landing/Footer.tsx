
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Life Kanban. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
