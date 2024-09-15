import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { useSpring, animated, to } from 'react-spring';
import SidebarChatComponent from './SidebarChatComponent';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', company: 'TechCorp', skills: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, name: 'AI Chatbot', company: 'InnovateTech', skills: ['Python', 'TensorFlow', 'NLP'] },
    { id: 3, name: 'Mobile Game', company: 'GameStudio', skills: ['Unity', 'C#', '3D Modeling'] },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  const [props, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    opacity: 1,
    config: { friction: 50, tension: 500 }
  }));

  const handleSwipe = (direction) => {
    api.start({
      x: direction === 'right' ? 500 : -500,
      rot: direction === 'right' ? 30 : -30,
      scale: 0.8,
      opacity: 0,
      config: { friction: 50, tension: 500 },
      onRest: () => {
        if (direction === 'right') {
          setMatches(prevMatches => [...prevMatches, projects[currentIndex]]);
        }
        setProjects(prevProjects => prevProjects.slice(1));
        api.start({ x: 0, rot: 0, scale: 1, opacity: 1, immediate: true });
      }
    });
  };

  const currentProject = projects[0];
  const nextProject = projects[1];

  const currentUser = {
    name: 'Andrew',
    avatar: '/path/to/andrew-avatar.jpg'
  };

  const ProjectCard = ({ project, style }) => (
    <animated.div
      style={{
        ...style,
        position: 'absolute',
        width: 300,
        height: 380,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 h-full">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <p className="text-gray-600">{project.company}</p>
        <div className="mt-2">
          {project.skills.map((skill, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </animated.div>
  );

  return (
    <div className="container mx-auto mt-10 flex h-[calc(100vh-6rem)]">
      <div className="w-1/3 pr-4">
        <SidebarChatComponent matches={matches} currentUser={currentUser} />
      </div>
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4 bg-center">Available Projects</h2>
        <div className="relative h-[400px] flex justify-center items-center">
          {nextProject && <ProjectCard project={nextProject} style={{ zIndex: 0 }} />}
          {currentProject && (
            <ProjectCard 
              project={currentProject} 
              style={{
                ...props,
                zIndex: 1,
                opacity: to([props.x, props.opacity], (x, opacity) => {
                  const distance = Math.abs(x);
                  return opacity * (1 - Math.min(distance / 500, 1));
                }),
              }} 
            />
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button 
            onClick={() => handleSwipe('left')}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <X size={24} />
          </button>
          <button 
            onClick={() => handleSwipe('right')}
            className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;