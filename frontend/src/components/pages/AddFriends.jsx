import React, { useState, useEffect } from 'react';
import { HiSearch, HiUserAdd } from 'react-icons/hi';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const AddFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingFriend, setAddingFriend] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  const fetchAvailableUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await UserService.getAvailableUsers();
      setAvailableUsers(users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (userId) => {
    try {
      setAddingFriend(userId);
      setError(null);
      await UserService.addFriend(userId);
      // Remove user from available users list after successful add
      setAvailableUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingFriend(null);
    }
  };

  const filteredUsers = availableUsers.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Find Friends
      </h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No users available{searchQuery ? ' matching your search' : ''}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}`}
                    alt={user.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">@{user.username}</h3>
                    {user.bio && (
                      <p className="text-sm text-gray-500 line-clamp-1">{user.bio}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/friends/${user._id}`)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleAddFriend(user._id)}
                    disabled={addingFriend === user._id}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl 
                      ${addingFriend === user._id
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                      } transition-colors`}
                  >
                    {addingFriend === user._id ? (
                      <div className="w-5 h-5 border-b-2 border-primary-600 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <HiUserAdd className="w-5 h-5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddFriends;
