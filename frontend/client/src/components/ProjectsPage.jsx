import React, { useState } from 'react';
import { X, Heart, Star, Zap } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', company: 'TechCorp', skills: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, name: 'AI Chatbot', company: 'InnovateTech', skills: ['Python', 'TensorFlow', 'NLP'] },
    // Add more projects as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    // Handle swipe logic here (e.g., applying, rejecting)
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const currentProject = projects[currentIndex];

  if (!currentProject) {
    return <div className="text-center mt-10">No more projects to display.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <img src={`https://picsum.photos/400/300?random=${currentProject.id}`} alt={currentProject.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{currentProject.name}</h2>
          <p className="text-gray-600">{currentProject.company}</p>
          <div className="mt-2">
            {currentProject.skills.map((skill, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center p-4 space-x-4">
          <button onClick={() => handleSwipe('left')} className="p-3 rounded-full bg-red-500 text-white">
            <X size={24} />
          </button>
          <button onClick={() => handleSwipe('right')} className="p-3 rounded-full bg-green-500 text-white">
            <Heart size={24} />
          </button>
          <button onClick={() => handleSwipe('superlike')} className="p-3 rounded-full bg-blue-500 text-white">
            <Star size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;