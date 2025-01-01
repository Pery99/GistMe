import React from 'react';
import { motion } from 'framer-motion';
import UserList from './UserList';
import ChatArea from './ChatArea';
import { FiSearch, FiSettings, FiLogOut } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-white shadow-soft flex flex-col"
      >
        {/* Profile Header */}
        <div className="p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="https://i.pinimg.com/736x/f7/12/4b/f7124be7aa0d7c54995e181149996b14.jpg" 
                  alt="profile" 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-400"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">John Doe</h3>
                <p className="text-sm text-primary-600">Online</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiSettings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search friends..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User List */}
        <UserList />

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col bg-white"
      >
        <ChatArea />
      </motion.div>
    </div>
  );
};

export default Home;
