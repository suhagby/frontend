const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get CRM dashboard data
router.get(
  '/crm',
  authMiddleware.authenticate,
  dashboardController.getCrmDashboard
);

// Get Analytics dashboard data
router.get(
  '/analytics',
  authMiddleware.authenticate,
  dashboardController.getAnalyticsDashboard
);

// Get eCommerce dashboard data
router.get(
  '/ecommerce',
  authMiddleware.authenticate,
  dashboardController.getEcommerceDashboard
);

module.exports = router;