import React, { useState, useEffect } from 'react';
import { X, MessageSquare, CircleCheckBig } from 'lucide-react';
import { useSpring, animated, to } from 'react-spring';
import { axiosWithAuth } from "../utils/axiosWithAuth"
import axios from 'axios'; 
const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', company: 'TechCorp', skills: ['React', 'Node.js', 'MongoDB'], image: 'https://picsum.photos/seed/ecommerce/600/400' },
    { id: 2, name: 'AI Chatbot', company: 'InnovateTech', skills: ['Python', 'TensorFlow', 'NLP'], image: 'https://picsum.photos/seed/chatbot/600/400' },
    { id: 3, name: 'Mobile Game', company: 'GameStudio', skills: ['Unity', 'C#', '3D Modeling'], image: 'https://picsum.photos/seed/mobilegame/600/400' },
  ]);

  const [likedProjects, setLikedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeChat, setActiveChat] = useState(null);

  const [props, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    opacity: 1,
    config: { friction: 50, tension: 500 }
  }));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosWithAuth.post('/api/get-posts/');
        setProjects(response.data.posts);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);
  const handleSwipe = (direction) => {
    api.start({
      x: direction === 'right' ? 500 : -500,
      rot: direction === 'right' ? 30 : -30,
      scale: 0.8,
      opacity: 0,
      config: { friction: 50, tension: 500 },
      onRest: () => {
        if (direction === 'right') {
          setLikedProjects([...likedProjects, projects[currentIndex]]);
        }
        setProjects(prevProjects => prevProjects.slice(1));
        setCurrentIndex(prevIndex => prevIndex + 1);
        api.start({ x: 0, rot: 0, scale: 1, opacity: 1, immediate: true });
      }
    });
  };

  useEffect(() => {
   console.log("projects", projects) 
  }, [projects])

  const currentProject = projects[currentIndex];

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

  const LikedProjectsList = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Liked Projects</h2>
      {likedProjects.map(project => (
        <div key={project.id} className="mb-4 p-4 border rounded cursor-pointer hover:bg-gray-100" onClick={() => setActiveChat(project)}>
          <h3 className="font-bold">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.company}</p>
        </div>
      ))}
    </div>
  );

  const ChatInterface = ({ project }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chat with {project.company}</h2>
        <button onClick={() => setActiveChat(null)} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div className="bg-gray-100 rounded p-4 h-64 overflow-y-auto mb-4">
        {/* Chat messages would go here */}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full p-2 border rounded"
      />
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white p-6 border-r">
        <LikedProjectsList />
      </div>
      <div className="w-2/3 p-6">
        <h2 className="text-3xl font-bold mb-6">Available Projects</h2>
        {activeChat ? (
          <ChatInterface project={activeChat} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;