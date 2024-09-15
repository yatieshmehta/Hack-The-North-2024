import React, { useState } from 'react';
import { User, Plus } from 'lucide-react';

const ProjectApplicantsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Frontend Developer Needed', description: 'React expert required' },
    { id: 2, title: 'Backend Engineer Wanted', description: 'Node.js and MongoDB skills' },
    { id: 3, title: 'Full Stack Developer', description: 'MERN stack proficiency' },
  ]);

  const [applicants, setApplicants] = useState({
    1: [
      { id: 1, name: 'Alice Johnson', title: 'Senior React Developer' },
      { id: 2, name: 'Bob Smith', title: 'Frontend Specialist' },
      { id: 3, name: 'Charlie Brown', title: 'UI/UX Developer' },
    ],
    2: [
      { id: 4, name: 'David Lee', title: 'Node.js Expert' },
      { id: 5, name: 'Eva Garcia', title: 'Backend Engineer' },
    ],
    3: [
      { id: 6, name: 'Frank Wilson', title: 'Full Stack Developer' },
      { id: 7, name: 'Grace Taylor', title: 'MERN Stack Engineer' },
    ],
  });

  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-6 overflow-y-auto border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Your project postings</h2>
        <p className="text-sm text-gray-600 mb-6">Look up people you've worked with</p>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedProject === project.id ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
        <button className="mt-6 flex items-center text-green-600 font-semibold">
          <Plus size={20} className="mr-2" />
          Add new project
        </button>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Applicants for {projects.find(p => p.id === selectedProject)?.title}</h2>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200">
            Share list
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicants[selectedProject]?.map((applicant) => (
            <div key={applicant.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                <User size={32} className="text-green-600" />
              </div>
              <h3 className="text-center font-semibold">{applicant.name}</h3>
              <p className="text-center text-sm text-gray-600">{applicant.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectApplicantsPage