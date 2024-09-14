import React, { useState } from 'react';
import { User, Mail, Lock, Code } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    favoriteLanguage: '',
    githubUsername: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="py-4 px-2 sm:px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Sign up for FinDev
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Find your perfect pair programming partner
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {[
          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User },
          { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', icon: Mail },
          { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', icon: Lock },
          { name: 'favoriteLanguage', label: 'Favorite Programming Language', type: 'text', placeholder: 'JavaScript', icon: Code },
          { name: 'githubUsername', label: 'GitHub Username', type: 'text', placeholder: 'johndoe', icon: Code },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <field.icon className="h-5 w-5 text-gray-400" />
              </div>
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
            </div>
          </div>
        ))}
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