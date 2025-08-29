import { groq } from 'next-sanity';
import { client } from '../client';
import { authenticatedClient } from '../authenticatedClient';
import type { SanityDocument } from 'sanity';
import type { MutationEvent } from '@sanity/client';

// Define the shape of our prompt documents
export interface SanityPrompt extends SanityDocument {
  _type: 'prompt';
  title: string;
  prompt: string;
  useCase: string;
  category: string;
  tags: string[];
  dateAdded: string;
  isFavorite: boolean;
  featured?: boolean;
}

// Type for our simplified update event
type SanityUpdateEvent<T = SanityPrompt> = {
  type: 'mutation' | 'welcome' | 'reconnect' | 'disconnect';
  documentId: string;
  result?: T;
  mutations?: any[];
  timestamp: string;
  transactionId: string;
  previous?: SanityDocument | null;
};

export interface CreatePromptData {
  title: string;
  prompt: string;
  useCase: string;
  category: string;
  tags: string[];
  isFavorite?: boolean;
  featured?: boolean;
}

export async function createPrompt(data: CreatePromptData): Promise<SanityPrompt> {
  try {
    const newPrompt = {
      _type: 'prompt' as const,
      title: data.title,
      prompt: data.prompt,
      useCase: data.useCase,
      category: data.category,
      tags: data.tags,
      dateAdded: new Date().toISOString(),
      isFavorite: data.isFavorite || false,
      featured: data.featured || false,
    };

    const created = await authenticatedClient.create(newPrompt);
    return created as SanityPrompt;
  } catch (error) {
    console.error('Error creating prompt:', error);
    throw new Error('Failed to create prompt');
  }
}

export async function getPrompts(): Promise<SanityPrompt[]> {
  const query = groq`
    *[_type == "prompt"] | order(_createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      prompt,
      useCase,
      category,
      tags,
      dateAdded,
      isFavorite,
      featured
    }
  `;

  return client.fetch<SanityPrompt[]>(query);
}

export function listenForPromptUpdates(
  callback: (update: SanityUpdateEvent) => void
): () => void {
  const query = groq`*[_type == "prompt"]`;
  
  const subscription = client
    .listen<SanityPrompt>(query)
    .subscribe({
      next: (event: MutationEvent<SanityPrompt>) => {
        // Transform the Sanity event to our simpler format
        const update: SanityUpdateEvent = {
          type: event.type,
          documentId: event.documentId,
          result: event.result,
          mutations: event.mutations,
          timestamp: event.timestamp,
          transactionId: event.transactionId
        };
        callback(update);
      },
      error: (error: Error) => {
        console.error('Subscription error:', error);
      },
      complete: () => {
        console.log('Subscription completed');
      }
    });
  
  return () => subscription.unsubscribe();
}

export async function toggleFavorite(id: string, isFavorite: boolean): Promise<SanityPrompt> {
  try {
    const result = await authenticatedClient
      .patch(id)
      .set({ isFavorite })
      .commit<SanityPrompt>();
    
    if (!result) {
      throw new Error('No document was returned from the update');
    }
    
    return result;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw new Error('Failed to update favorite status');
  }
}

// Set up real-time listener for prompt updates
export function setupRealtimeListener(
  onUpdate: (update: SanityUpdateEvent) => void
): () => void {
  const query = groq`*[_type == "prompt"]`;
  
  const subscription = client
    .listen<SanityPrompt>(query)
    .subscribe({
      next: (event) => {
        console.log('Received update:', event);
        onUpdate(event);
      },
      error: (error) => {
        console.error('Error in real-time subscription:', error);
      },
      complete: () => {
        console.log('Subscription completed');
      },
    });
  
  // Return cleanup function
  return () => subscription.unsubscribe();
}
