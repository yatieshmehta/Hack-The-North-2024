import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Code, FileText, Layers, FileUp } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios: npm install axios

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    favoriteLanguage: '',
    githubUsername: '',
    bio: '',
    devFocus: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (resumeFile) {
      formDataToSend.append('resume', resumeFile);
    }

    try {
      const response = await axios.post('/api/sign-up/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Sign up successful:', response.data);
      setSuccess(true);
      // Here you might want to store the tokens in local storage or context
      localStorage.setItem('accessToken', response.data.access_token);
      navigate('/projects');
    } catch (err) {
      console.error('Sign up error:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'An error occurred during sign up.');
    }
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const formFields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User },
    { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', icon: Mail },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', icon: Lock },
    { name: 'favoriteLanguage', label: 'Favorite Programming Language', type: 'text', placeholder: 'JavaScript', icon: Code },
    { name: 'githubUsername', label: 'GitHub Username', type: 'text', placeholder: 'johndoe', icon: Code },
    { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself...', icon: FileText },
    { name: 'devFocus', label: 'Development Focus', type: 'select', icon: Layers, options: [
      { value: '', label: 'Select your focus' },
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend', label: 'Backend' },
      { value: 'fullstack', label: 'Full Stack' },
      { value: 'hardware', label: 'Hardware' },
      { value: 'other', label: 'Other' },
    ]},
  ];

  return (
    <div className="py-4 px-2 sm:px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Sign up for DevelopersAssemble
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Find your perfect pair programming partner
      </p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your account has been created successfully.</span>
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <field.icon className="h-5 w-5 text-gray-400" />
              </div>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  id={field.name}
                  rows="3"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  id={field.name}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          </div>
        ))}
        
        {/* Resume Upload Section */}
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Resume
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <FileUp className="h-full w-full text-gray-300" />
            </span>
            <label
              htmlFor="resume"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Choose file
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <span className="ml-4 text-sm text-gray-500">
              {resumeFile ? resumeFile.name : 'No file chosen'}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;