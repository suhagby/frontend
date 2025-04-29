# Materialize Admin Backend API

This is the backend API for the Materialize Admin dashboard application. It provides authentication, user management, and dashboard data services to support the Next.js frontend.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/materialize-admin
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Running the Server

Start the development server:

```bash
npm run dev
```

For production:

```bash
npm start
```

### Seeding the Database

To populate the database with initial data:

```bash
npm run seed
```

This will create default users with the following credentials:
- Admin: admin@materialize.com / admin
- Editor: editor@materialize.com / password123
- Author: author@materialize.com / password123
- Maintainer: maintainer@materialize.com / password123
- Subscriber: subscriber@materialize.com / password123

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Request body: `{ name, email, password, role }`
  - Response: User object with JWT token

- `POST /api/auth/login` - Login and get JWT token
  - Request body: `{ email, password }`
  - Response: User object with JWT token

- `GET /api/auth/me` - Get current user (protected)
  - Headers: `Authorization: Bearer <token>`
  - Response: User object

### Users

- `GET /api/users` - Get all users (admin only)
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of user objects

- `GET /api/users/:id` - Get user by ID
  - Headers: `Authorization: Bearer <token>`
  - Response: User object

- `PUT /api/users/:id` - Update user
  - Headers: `Authorization: Bearer <token>`
  - Request body: User data to update
  - Response: Updated user object

- `DELETE /api/users/:id` - Delete user (admin only)
  - Headers: `Authorization: Bearer <token>`
  - Response: Success message

### Dashboard

- `GET /api/dashboard/crm` - Get CRM dashboard data
  - Headers: `Authorization: Bearer <token>`
  - Response: CRM dashboard data including:
    - Congratulations card data
    - Statistics
    - Social network visits
    - Meeting schedule
    - Sales by countries
    - User list

- `GET /api/dashboard/analytics` - Get Analytics dashboard data
  - Headers: `Authorization: Bearer <token>`
  - Response: Analytics dashboard data

- `GET /api/dashboard/ecommerce` - Get eCommerce dashboard data
  - Headers: `Authorization: Bearer <token>`
  - Response: eCommerce dashboard data

## Project Structure

The project follows an MVC architecture:

### Controllers

- `src/controllers/auth.controller.js` - Authentication controller
  - `register()` - Register a new user
  - `login()` - Authenticate user and generate JWT
  - `getCurrentUser()` - Get the authenticated user's profile

- `src/controllers/user.controller.js` - User management controller
  - `getAllUsers()` - Get all users (admin only)
  - `getUserById()` - Get a specific user by ID
  - `updateUser()` - Update user information
  - `deleteUser()` - Delete a user (admin only)

- `src/controllers/dashboard.controller.js` - Dashboard data controller
  - `getCrmDashboard()` - Get CRM dashboard data
  - `getAnalyticsDashboard()` - Get Analytics dashboard data
  - `getEcommerceDashboard()` - Get eCommerce dashboard data

### Models

- `src/models/user.model.js` - User model with schema definition
  - Fields: name, email, password (hashed), role, status, avatar
  - Methods: comparePassword

### Routes

- `src/routes/auth.routes.js` - Authentication routes
- `src/routes/user.routes.js` - User management routes
- `src/routes/dashboard.routes.js` - Dashboard data routes

### Middleware

- `src/middleware/auth.middleware.js` - Authentication middleware
  - `authenticate()` - Verify JWT token and attach user to request
  - `authorize()` - Check user role for authorization

### Config

- `src/config/db.js` - Database connection configuration
- `src/config/server.js` - Express server configuration

## Frontend Integration

This backend is designed to work with the Next.js frontend. The frontend connects to this API using:

- Axios for API requests
- JWT authentication
- Custom hooks for authentication state management

See the [frontend README](/frontend/README.md) for more details on how to set up the complete application.

## Data Flow

1. **Authentication Flow**:
   - User submits login credentials
   - Backend validates credentials and returns JWT token
   - Frontend stores token in localStorage
   - Token is included in subsequent API requests

2. **Dashboard Data Flow**:
   - Frontend requests dashboard data from appropriate endpoint
   - Backend authenticates request using JWT
   - Backend returns dashboard data
   - Frontend renders dashboard components with data

## Contributing

We welcome contributions to this project! Feel free to submit issues and pull requests to help improve the application. Please see our [Contributing Guidelines](/CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.