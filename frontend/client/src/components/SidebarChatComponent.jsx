import React, { useState } from 'react';
import { User, MessageSquare } from 'lucide-react';

const SidebarChatComponent = ({ matches, currentUser }) => {
  const [activeTab, setActiveTab] = useState('matches');
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 text-white flex items-center">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full mr-3" />
        <span className="font-bold">{currentUser.name}</span>
      </div>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 ${activeTab === 'matches' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 'messages' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>
      
      {activeTab === 'matches' && (
        <div className="flex-1 overflow-y-auto p-4">
          {matches.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-pink-100 text-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <User size={40} />
              </div>
              <h3 className="font-bold text-xl mb-2">Start Matching</h3>
              <p className="text-gray-500 text-sm">
                Matches will appear here once you start to Like people. You can message them directly from here when you're ready to spark up the conversation.
              </p>
            </div>
          ) : (
            matches.map(match => (
              <div key={match.id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedMatch(match)}>
                <img src={match.avatar} alt={match.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <h3 className="font-bold">{match.name}</h3>
                  <p className="text-sm text-gray-500">{match.lastMessage || 'New match!'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      {activeTab === 'messages' && selectedMatch && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {/* Chat messages would go here */}
          </div>
          <div className="border-t p-2">
            <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-full border" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarChatComponent;