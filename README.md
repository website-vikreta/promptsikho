# PromptSikho - AI Prompt Management System

A Next.js application for managing and sharing AI prompts with Sanity.io as the backend.

## Getting Started

### Prerequisites

- Node.js 14.6.0 or later
- npm or yarn
- Sanity.io account and project

### Environment Setup

1. Create a `.env.local` file in the root directory
2. Add the following environment variables:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
NEXT_PUBLIC_SANITY_API_TOKEN=your_sanity_api_token_with_write_permissions
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sanity Studio

To run the Sanity Studio locally:

```bash
cd sanity
npm install
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) to access the Sanity Studio.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
