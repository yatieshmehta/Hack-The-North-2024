import React, { useState } from 'react';
import { X, Heart, MessageSquare, CircleCheckBig } from 'lucide-react';
import { useSpring, animated, to } from 'react-spring';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', company: 'TechCorp', skills: ['React', 'Node.js', 'MongoDB'], image: 'https://picsum.photos/seed/ecommerce/600/400' },
    { id: 2, name: 'AI Chatbot', company: 'InnovateTech', skills: ['Python', 'TensorFlow', 'NLP'], image: 'https://picsum.photos/seed/chatbot/600/400' },
    { id: 3, name: 'Mobile Game', company: 'GameStudio', skills: ['Unity', 'C#', '3D Modeling'], image: 'https://picsum.photos/seed/mobilegame/600/400' },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChat, setShowChat] = useState(false);

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
          setShowChat(true);
        } else {
          setProjects(prevProjects => prevProjects.slice(1));
        }
        api.start({ x: 0, rot: 0, scale: 1, opacity: 1, immediate: true });
      }
    });
  };

  const currentProject = projects[currentIndex];

  const currentUser = {
    name: 'Andrew',
    avatar: 'https://picsum.photos/seed/andrew/200/200'
  };

  const ProjectCard = ({ project, style }) => (
    <animated.div
      style={{
        ...style,
        position: 'absolute',
        width: 400,
        height: 500,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
        <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-4">{project.company}</p>
          <div className="mb-4">
            {project.skills.map((skill, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white p-6 border-r">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center mb-2">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full mr-3" />
            <span className="font-bold text-xl">{currentUser.name}</span>
          </div>
        </div>
        <div className="bg-white rounded-b-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Matches</h2>
          {showChat ? (
            <div>
              <h3 className="font-semibold mb-2">Chat with {currentProject.company}</h3>
              <div className="bg-gray-100 rounded p-4 h-64 overflow-y-auto mb-4">
                {/* Chat messages would go here */}
              </div>
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 border rounded"
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-pink-100 text-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={40} />
              </div>
              <h3 className="font-bold text-xl mb-2">Start Applying</h3>
              <p className="text-gray-500 text-sm">
                Matches will appear here once you start to Like projects. You can message them directly from here when you're ready to spark up the conversation.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-2/3 p-6">
        <h2 className="text-3xl font-bold mb-6">Available Projects</h2>
        <div className="relative h-[500px] flex justify-center items-center">
          {currentProject && (
            <ProjectCard
              project={currentProject}
              style={{
                ...props,
                opacity: to([props.x, props.opacity], (x, opacity) => {
                  const distance = Math.abs(x);
                  return opacity * (1 - Math.min(distance / 500, 1));
                }),
              }}
            />
          )}
        </div>
        <div className="flex justify-center mt-6 space-x-6">
          <button
            onClick={() => handleSwipe('left')}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
          >
            <X size={32} />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="p-4 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
          >
            <CircleCheckBig size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;