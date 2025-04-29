const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all users (admin only)
router.get(
  '/',
  authMiddleware.authenticate,
  authMiddleware.authorize('admin'),
  userController.getAllUsers
);

// Get user by ID
router.get(
  '/:id',
  authMiddleware.authenticate,
  userController.getUserById
);

// Update user
router.put(
  '/:id',
  authMiddleware.authenticate,
  userController.updateUser
);

// Delete user (admin only)
router.delete(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.authorize('admin'),
  userController.deleteUser
);

module.exports = router;