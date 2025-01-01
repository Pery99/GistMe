import React from "react";
import { FiSend, FiImage, FiSmile } from "react-icons/fi";

const ChatArea = () => {
  return (
    <>
      {/* Chat Header */}
      <div className="p-4 border-b bg-white shadow-soft">
        <div className="flex items-center space-x-3">
          <img
            src="https://ui-avatars.com/api/?name=Alice+Smith&background=random"
            alt="Chat user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Alice Smith</h3>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Message bubbles would be mapped here */}
        <div className="flex justify-end">
          <div className="bg-primary-500 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-md shadow-sm">
            Hey! How are you?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-md">
            I'm doing great! Thanks for asking 😊
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiImage className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiSmile className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <button className="p-2 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-full text-white transition-colors shadow-sm">
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatArea;
