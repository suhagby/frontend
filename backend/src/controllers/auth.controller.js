const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'subscriber'
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login user (mock version for testing)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock user data for testing
    const mockUsers = [
      {
        _id: '1',
        name: 'Admin User',
        email: 'admin@materialize.com',
        password: 'admin',
        role: 'admin',
        status: 'active',
        avatar: '/images/avatars/1.png'
      },
      {
        _id: '2',
        name: 'Editor User',
        email: 'editor@materialize.com',
        password: 'password123',
        role: 'editor',
        status: 'active',
        avatar: '/images/avatars/2.png'
      }
    ];

    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password (simple check for testing)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get current user (mock version for testing)
exports.getCurrentUser = async (req, res) => {
  try {
    // Mock user data based on the token
    const mockUser = {
      _id: req.user.id,
      name: req.user.id === '1' ? 'Admin User' : 'Editor User',
      email: req.user.email,
      role: req.user.role,
      status: 'active',
      avatar: req.user.id === '1' ? '/images/avatars/1.png' : '/images/avatars/2.png'
    };
    
    res.json(mockUser);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Failed to get user', error: error.message });
  }
};