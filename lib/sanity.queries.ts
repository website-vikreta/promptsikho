import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export async function getPrompts() {
  const query = groq`
    *[_type == "prompt"] | order(_createdAt desc) {
      _id,
      title,
      prompt,
      useCase,
      category,
      tags,
      dateAdded,
      isFavorite,
      featured,
      "id": _id
    }
  `;

  return client.fetch(query);
}
