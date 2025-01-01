import React from 'react';
import { motion } from 'framer-motion';

const UserList = () => {
  const users = [
    { id: 1, name: 'Alice Smith', status: 'online', lastMessage: 'Hey, how are you?', timestamp: '2m ago' },
    { id: 2, name: 'Bob Johnson', status: 'offline', lastMessage: 'See you tomorrow!', timestamp: '1h ago' },
    // Add more users as needed
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {users.map((user, index) => (
        <motion.div 
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
              ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900">{user.name}</h4>
              <span className="text-xs text-gray-500">{user.timestamp}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserList;
