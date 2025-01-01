import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChat, HiDotsVertical, HiUserAdd, HiSearch } from 'react-icons/hi';
import UserService from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';

const Friends = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      setError(null);
      const friendsList = await UserService.getFriends();
      setFriends(friendsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
          My Friends ({friends.length})
        </h1>
        <button
          onClick={() => navigate('/friends/add')}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
        >
          <HiUserAdd className="w-5 h-5" />
          <span>Add New Friends</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Friends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFriends.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            {searchQuery ? 'No friends match your search' : 'No friends yet. Add some!'}
          </div>
        ) : (
          filteredFriends.map((friend) => (
            <div
              key={friend._id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={friend.profilePicture || `https://ui-avatars.com/api/?name=${friend.username}`}
                    alt={friend.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">@{friend.username}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/friends/${friend._id}`)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate(`/chat/${friend._id}`)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <HiChat className="w-5 h-5" />
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

export default Friends;
