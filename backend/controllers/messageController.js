const { default: mongoose } = require('mongoose');
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    if (req.user.userId === req.params.receiverId) {
      return res.status(400).json({ error: "You cannot send messages to yourself" });
    }
    
    const message = new Message({
      sender: req.user.userId,
      receiver: req.params.receiverId,
      content: req.body.content
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.userId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRecentMessages = async (req, res) => {
  try {
    // Get all conversations where user is either sender or receiver
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(req.user.userId) },
            { receiver: new mongoose.Types.ObjectId(req.user.userId) }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', new mongoose.Types.ObjectId(req.user.userId)] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          userId: '$userDetails._id',
          username: '$userDetails.username',
          profilePicture: '$userDetails.profilePicture',
          lastMessage: {
            content: '$lastMessage.content',
            createdAt: '$lastMessage.createdAt'
          }
        }
      }
    ]);

    res.json(conversations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
