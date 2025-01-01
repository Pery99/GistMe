import React, { useState, useEffect } from 'react';
import { HiMail, HiUserGroup, HiCamera, HiPencil, HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/userService';
import AuthService from '../../services/auth';
import LoadingSpinner from '../common/LoadingSpinner';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await UserService.getCurrentUserProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-purple-500"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Basic Info */}
          <div className="flex justify-between items-start">
            <div className="-mt-12">
              <img
                src={profile?.profilePicture || `https://ui-avatars.com/api/?name=${profile?.username}`}
                alt="Profile"
                className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
              />
            </div>
            <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
              Edit Profile
            </button>
          </div>

          {/* User Info */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">@{profile?.username}</h1>
            {profile?.bio && (
              <p className="mt-2 text-gray-600">{profile.bio}</p>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600">
                <HiUserGroup className="w-5 h-5" />
                <span>Friends</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{profile?.friends?.length || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600">
                <HiMail className="w-5 h-5" />
                <span>Email</span>
              </div>
              <p className="mt-2 text-sm text-gray-900 break-all">{profile?.email}</p>
            </div>
          </div>

          {/* Friends Preview */}
          {profile?.friends?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Friends</h2>
              <div className="flex flex-wrap gap-2">
                {profile.friends.map((friend) => (
                  <img
                    key={friend._id}
                    src={friend.profilePicture || `https://ui-avatars.com/api/?name=${friend.username}`}
                    alt={friend.username}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    title={friend.username}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 
                     text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          >
            <HiLogout className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
