This is a full-stack application built with Next.js for the frontend and an Express + Prisma backend.

## Getting Started

### Development

Install dependencies and start the Next.js dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

For the backend and database you can use Docker:

```bash
docker-compose up --build
```

This will start a Postgres database and the Express API on port `12000`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

The frontend can be deployed to Vercel while the backend can run on any platform that supports Docker (Render, Railway, Heroku, etc.).

1. Build the frontend and backend images:

```bash
docker-compose build
```

2. Push the images to your container registry and deploy the services.

Ensure the environment variables in `.env` match your production configuration.
