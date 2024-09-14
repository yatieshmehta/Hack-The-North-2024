import React, { useState, useRef, useEffect } from 'react';
import { Code, Heart } from 'lucide-react';
import SignUpPage from '../SignUpForm/SignUpForm';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center">
          <Code className="mr-2" size={32} />
          FinDev
          <Heart className="ml-2" size={32} />
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">Find your perfect pair programming partner</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition duration-300"
        >
          Sign Up Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="float-right text-gray-600 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <SignUpPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;