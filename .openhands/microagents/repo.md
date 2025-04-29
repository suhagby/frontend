---
name: repo
type: repo
agent: CodeActAgent
---

This repository contains a Next.js frontend application built with Material UI. It appears to be an admin template/dashboard application with various UI components, authentication, and database integration.

## General Setup:

To set up the repository:

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values
   - Required variables include database connection, authentication settings, and API URLs

3. Run development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

Before pushing any changes, you should ensure that any lint errors have been fixed:
```bash
pnpm lint:fix
pnpm format
```

## Repository Structure

### Core Structure:
- **src/app**: Main Next.js application directory with routing
  - **[lang]**: Internationalization support
  - **api**: API routes
  - **front-pages**: Frontend pages
- **src/@core**: Core components and utilities
- **src/@layouts**: Layout components
- **src/@menu**: Menu components and configurations
- **src/components**: Reusable UI components
- **src/configs**: Application configuration
- **src/contexts**: React context providers
- **src/hooks**: Custom React hooks
- **src/prisma**: Database schema and client
- **src/redux-store**: Redux state management
- **src/views**: UI view components

### Key Technologies:
- **Next.js 15**: React framework for server-rendered applications
- **Material UI 6**: React UI component library
- **Prisma**: Database ORM with SQLite as the default provider
- **NextAuth.js**: Authentication solution
- **Redux**: State management
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Static type checking

### Database:
- Uses Prisma ORM with SQLite as the default provider
- Schema includes models for User, Account, Session, and VerificationToken
- To run migrations: `pnpm migrate`

### Authentication:
- Uses NextAuth.js for authentication
- Supports Google OAuth 2.0
- Includes session management and account linking

### Development Tools:
- ESLint and Prettier for code linting and formatting
- TypeScript for type checking
- TailwindCSS for styling
- Stylelint for CSS linting

### Internationalization:
- Supports multiple languages
- Can be removed with `pnpm removeI18n` if not needed

### Additional Features:
- Calendar integration with FullCalendar
- Charts with ApexCharts and Recharts
- Rich text editing with TipTap
- Map integration with Mapbox
- Form handling with React Hook Form