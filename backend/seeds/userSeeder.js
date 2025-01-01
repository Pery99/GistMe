const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const dummyUsers = [
  { username: 'john_doe', email: 'john@example.com', password: 'password123', bio: 'Software Developer' },
  { username: 'jane_smith', email: 'jane@example.com', password: 'password123', bio: 'UI/UX Designer' },
  { username: 'mike_wilson', email: 'mike@example.com', password: 'password123', bio: 'Product Manager' },
  { username: 'sarah_jones', email: 'sarah@example.com', password: 'password123', bio: 'Data Scientist' },
  { username: 'alex_brown', email: 'alex@example.com', password: 'password123', bio: 'Web Developer' },
  { username: 'emma_davis', email: 'emma@example.com', password: 'password123', bio: 'Digital Artist' },
  { username: 'chris_miller', email: 'chris@example.com', password: 'password123', bio: 'Game Developer' },
  { username: 'lisa_taylor', email: 'lisa@example.com', password: 'password123', bio: 'Content Creator' },
  { username: 'tom_anderson', email: 'tom@example.com', password: 'password123', bio: 'Tech Enthusiast' },
  { username: 'amy_white', email: 'amy@example.com', password: 'password123', bio: 'Software Engineer' }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing users
    await User.deleteMany({});
    
    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      dummyUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    
    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    
    // Add some random friends
    for (let user of createdUsers) {
      // Get 3 random users as friends
      const possibleFriends = createdUsers.filter(u => u._id.toString() !== user._id.toString());
      const randomFriends = possibleFriends.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      user.friends = randomFriends.map(friend => friend._id);
      await user.save();
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();
