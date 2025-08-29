import { createClient } from 'next-sanity';

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

console.log('Sanity Config:', {
  projectId: projectId ? '***' + projectId.slice(-4) : 'undefined',
  dataset,
  apiVersion,
  hasToken: !!token
});

if (!token) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_API_TOKEN environment variable');
}

export const authenticatedClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Always use the API, not CDN for writes
  perspective: 'published',
  stega: {
    studioUrl: '/studio',
  },
});
