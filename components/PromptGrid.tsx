import { PromptCard } from "./PromptCard";
import { AddPromptDialog } from "./AddPromptDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { getPrompts, toggleFavorite, listenForPromptUpdates, SanityPrompt } from "@/sanity/lib/queries";
import { toast } from "sonner";
import { Plus } from "lucide-react";

// Use the SanityPrompt type from our queries
type Prompt = SanityPrompt;

// Define categories for filtering
const categories = ["All", "Marketing", "Coding", "Writing", "Business", "Design"] as const;
type Category = typeof categories[number];

export default function PromptGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Format date helper function
  const formatPromptDate = (prompt: SanityPrompt): SanityPrompt => ({
    ...prompt,
    dateAdded: new Date(prompt.dateAdded).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  });

  // Fetch prompts from Sanity with real-time updates
  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;
    
    const setupPrompts = async () => {
      try {
        // Initial fetch
        const data = await getPrompts();
        if (!isMounted) return;
        
        setPrompts(data.map(formatPromptDate));
        
        // Set up real-time listener
        unsubscribe = listenForPromptUpdates((update) => {
          if (!update.result) return;
          
          const { result } = update;
          setPrompts(currentPrompts => {
            const updatedPrompts = [...currentPrompts];
            const index = updatedPrompts.findIndex(p => p._id === update.documentId);
            
            if (index !== -1) {
              // Update existing prompt
              updatedPrompts[index] = formatPromptDate({
                ...updatedPrompts[index],
                ...result
              });
            } else if (update.type === 'mutation' && result._id) {
              // Only add new prompt if it's an update from a mutation (not our own optimistic update)
              // and it's not already in the list (shouldn't be, but just in case)
              const promptExists = updatedPrompts.some(p => p._id === result._id);
              if (!promptExists) {
                updatedPrompts.unshift(formatPromptDate(result));
              }
            }
            
            return updatedPrompts;
          });
        });
        
        setError(null);
      } catch (err) {
        console.error('Error setting up real-time updates:', err);
        setError('Failed to set up real-time updates. Some features may not work.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    setupPrompts();

    // Cleanup function
    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter prompts based on selected category and search query
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handlePromptAdded = (newPrompt: Prompt) => {
    // Add the new prompt to the beginning of the list
    setPrompts(prevPrompts => [formatPromptDate(newPrompt), ...prevPrompts]);
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      // Find the current prompt to get the current favorite status
      const currentPrompt = prompts.find(p => p._id === id);
      if (!currentPrompt) {
        console.error('Prompt not found with ID:', id);
        return;
      }
      
      const newFavoriteStatus = !currentPrompt.isFavorite;
      
      // Optimistic update
      setPrompts(prevPrompts =>
        prevPrompts.map(prompt =>
          prompt._id === id ? { ...prompt, isFavorite: newFavoriteStatus } : prompt
        )
      );

      // Update in Sanity
      await toggleFavorite(id, newFavoriteStatus);
      
      toast.success(`Prompt ${newFavoriteStatus ? 'added to' : 'removed from'} favorites`);
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      
      // Revert on error
      setPrompts(prevPrompts =>
        prevPrompts.map(prompt =>
          prompt._id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt
        )
      );
      
      // Show error toast with more details
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update favorite: ${errorMessage}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleCategoryChange(category as Category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Prompts</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search prompts..."
            className="w-full sm:w-[200px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AddPromptDialog onPromptAdded={handlePromptAdded} />
        </div>
      </div>
      
      {/* Prompts Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            id={prompt._id}
            title={prompt.title}
            prompt={prompt.prompt}
            useCase={prompt.useCase}
            category={prompt.category}
            tags={prompt.tags}
            dateAdded={prompt.dateAdded}
            isFavorite={prompt.isFavorite}
            featured={prompt.featured || false}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
      
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No prompts found matching your search criteria.
        </div>
      )}
    </section>
  );
}