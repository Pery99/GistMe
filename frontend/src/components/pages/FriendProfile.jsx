import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiChat, HiUserAdd, HiArrowLeft } from 'react-icons/hi';
import UserService from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';

const FriendProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await UserService.getUserProfile(id);
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <HiArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-purple-500"></div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="-mt-12">
              <img
                src={profile?.profilePicture || `https://ui-avatars.com/api/?name=${profile?.username}`}
                alt={profile?.username}
                className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
              />
            </div>
            <div className="pt-4 flex gap-2">
              <button
                onClick={() => navigate(`/chat/${id}`)}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
              >
                <HiChat className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">@{profile?.username}</h1>
            {profile?.bio && (
              <p className="mt-2 text-gray-600">{profile.bio}</p>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{profile?.friends?.length || 0}</div>
              <div className="text-sm text-gray-500">Friends</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
