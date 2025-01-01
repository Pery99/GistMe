const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('friends', 'username profilePicture');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addFriend = async (req, res) => {
  try {
    if (req.user.userId === req.params.friendId) {
      return res.status(400).json({ error: "You cannot add yourself as a friend" });
    }

    const user = await User.findById(req.user.userId);
    
    // Check if already friends
    if (user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ error: "Already in friends list" });
    }
    
    user.friends.push(req.params.friendId);
    await user.save();
    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('friends', 'username profilePicture');
    res.json(user.friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAvailableUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    
    // Get all users except current user and existing friends
    const availableUsers = await User.find({
      _id: { 
        $ne: req.user.userId, // not equal to current user
        $nin: currentUser.friends // not in friends array
      }
    })
    .select('username profilePicture bio');
    
    res.json(availableUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('friends', 'username profilePicture bio');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
