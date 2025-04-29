# Materialize Admin Dashboard

A full-stack admin dashboard application built with Next.js, TypeScript, Material UI, Express.js, and MongoDB.

## Project Overview

This project provides a comprehensive admin dashboard solution with multiple dashboard views (CRM, Analytics, eCommerce), user management, authentication, and role-based access control.

### Key Features

- **Multiple Dashboard Views**: CRM, Analytics, and eCommerce dashboards with interactive charts and statistics
- **User Authentication**: JWT-based authentication system with protected routes
- **Role-Based Access Control**: Different permission levels based on user roles
- **User Management**: Complete CRUD operations for user accounts
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Dark/Light Mode**: Theme switching capability
- **Internationalization**: Multi-language support
- **Modern UI Components**: Built with Material UI for a polished look and feel

## Technology Stack

1. **Frontend**:
   - Next.js 15 with App Router
   - TypeScript
   - Material UI 6
   - Redux Toolkit for state management
   - Axios for API requests
   - ApexCharts and Recharts for data visualization
   - React Hook Form for form handling

2. **Backend**:
   - Express.js
   - MongoDB with Mongoose
   - JWT for authentication
   - bcrypt for password hashing
   - CORS for cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)

### Setup

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```javascript
PORT=5000
MONGODB_URI=mongodb://localhost:27017/materialize-admin
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

5. (Optional) Seed the database with initial data:
```bash
npm run seed
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```javascript
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Login Credentials

After seeding the database, you can log in with the following credentials:

- **Admin**: admin@materialize.com / admin
- **Editor**: editor@materialize.com / password123
- **Author**: author@materialize.com / password123
- **Maintainer**: maintainer@materialize.com / password123
- **Subscriber**: subscriber@materialize.com / password123

## Architecture

### Frontend Architecture

The frontend follows a modular architecture with:

- **App Router**: Next.js App Router with route groups for organization
- **Component-Based Design**: Reusable UI components
- **Service Layer**: API services for backend communication
- **Custom Hooks**: Reusable logic for authentication and data fetching
- **State Management**: Redux for global state, React Context for theme and localization

### Backend Architecture

The backend follows an MVC architecture with:

- **Controllers**: Handle request processing and response generation
- **Models**: Define data schemas and database interactions
- **Routes**: Define API endpoints and connect them to controllers
- **Middleware**: Handle authentication, authorization, and request processing
- **Config**: Application configuration and environment variables

## API Integration

The frontend and backend are integrated through a RESTful API:

1. **Authentication Endpoints**:
   - POST /api/auth/register - Register new users
   - POST /api/auth/login - Authenticate users
   - GET /api/auth/me - Get current user profile

2. **User Management Endpoints**:
   - GET /api/users - List all users
   - GET /api/users/:id - Get user details
   - PUT /api/users/:id - Update user
   - DELETE /api/users/:id - Delete user

3. **Dashboard Data Endpoints**:
   - GET /api/dashboard/crm - Get CRM dashboard data
   - GET /api/dashboard/analytics - Get Analytics dashboard data
   - GET /api/dashboard/ecommerce - Get eCommerce dashboard data

## Detailed Documentation

For more detailed information about each part of the application:

- [Frontend Documentation](/frontend/README.md)
- [Backend Documentation](/backend/README.md)

## Development Workflow

1. **Backend Development**:
   - Implement models, controllers, and routes
   - Test API endpoints with tools like Postman
   - Implement authentication and authorization

2. **Frontend Development**:
   - Create UI components and pages
   - Implement API integration
   - Add state management and routing

3. **Integration**:
   - Connect frontend to backend API
   - Test end-to-end functionality
   - Optimize performance

## Deployment

### Backend Deployment

The backend can be deployed to any Node.js hosting service:
- Heroku
- DigitalOcean
- AWS Elastic Beanstalk
- Google Cloud Run

### Frontend Deployment

The Next.js frontend can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- GitHub Pages

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Commercial license.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Material UI](https://mui.com/) - React UI Framework
- [Express.js](https://expressjs.com/) - Web Framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL Database