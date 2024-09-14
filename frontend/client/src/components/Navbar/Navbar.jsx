import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Briefcase } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <Code className="mr-2" />
          FinDev
        </Link>
        <div className="space-x-4 flex gap:10">
          <Link to="/candidates" className="text-white hover:text-purple-200 flex items-center">
            <Users className="mr-1" />
            Candidates
          </Link>
          <Link to="/projects" className="text-white hover:text-purple-200 flex items-center">
            <Briefcase className="mr-1" />
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;