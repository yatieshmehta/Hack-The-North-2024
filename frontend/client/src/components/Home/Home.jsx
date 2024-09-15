import React, { useState, useRef, useEffect } from 'react';
import { Code, Heart } from 'lucide-react';
import SignUpPage from '../SignUpForm/SignUpForm';
import finddev from "../../assets/findev_homepage.jpg";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [apiResponse, setApiResponse] = useState("");
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
  const testCall = async () => {
      try {
        console.log("Starting API call");
        const response = await fetch('/api/test/');
        console.log("Response received:", response);
        
        // Log the response text
        const responseText = await response.text();
        console.log("Response text:", responseText);
        
        if (!response.ok) {
          throw new Error(`Network response not ok: ${response.status} ${response.statusText}`);
        }
        
        // Only try to parse JSON if the response was ok
        const data = JSON.parse(responseText);
        console.log("Data received:", data);
        setApiResponse(data.message);
      } catch (error) {
        console.error("Error in API call:", error);
        setApiResponse('Failed to fetch data. Please try again.');
      }
    };
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-between"    style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${finddev})` 
    }}>
      <div className="flex-grow flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center">
          <Code className="mr-2" size={48} />
          DevelopersAssemble
          <Heart className="ml-2" size={48} />
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
          Because your love life is as non-existent as a bug-free code!
        </p>
        <button
          onClick={testCall}
          className="bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 text-lg mb-4"
        ></button>
         {apiResponse && (
          <p className="text-white text-lg bg-black bg-opacity-50 p-4 rounded-lg max-w-2xl">
            {apiResponse}
          </p>
        )}
      </div>
      
      <div className="bg-black bg-opacity-50 py-8 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Sign Up for DaaS
        </h2>
        <p className="text-lg md:text-xl text-white mb-6">
          Find your perfect pair programming partner
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-purple-100 transition duration-300 text-lg"
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