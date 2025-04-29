const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/materialize-admin')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Initial users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@materialize.com',
    password: 'admin',
    role: 'admin',
    status: 'active'
  },
  {
    name: 'Editor User',
    email: 'editor@materialize.com',
    password: 'password123',
    role: 'editor',
    status: 'active'
  },
  {
    name: 'Author User',
    email: 'author@materialize.com',
    password: 'password123',
    role: 'author',
    status: 'active'
  },
  {
    name: 'Maintainer User',
    email: 'maintainer@materialize.com',
    password: 'password123',
    role: 'maintainer',
    status: 'active'
  },
  {
    name: 'Subscriber User',
    email: 'subscriber@materialize.com',
    password: 'password123',
    role: 'subscriber',
    status: 'active'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create new users
    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();