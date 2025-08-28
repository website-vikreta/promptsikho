import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, Heart, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PromptDetailDialog } from "./PromptDetailDialog";

interface PromptCardProps {
  title: string;
  prompt: string;
  useCase: string;
  category: string;
  tags: string[];
  dateAdded: string;
  isFavorite?: boolean;
  featured?: boolean;
  id?: number;
  onToggleFavorite?: (id: number, isFavorite: boolean) => void;
}

export function PromptCard({ 
  title, 
  prompt, 
  useCase, 
  category, 
  tags, 
  dateAdded, 
  isFavorite = false,
  featured = false,
  id,
  onToggleFavorite
}: PromptCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!", {
      duration: 2000,
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    if (id && onToggleFavorite) {
      onToggleFavorite(id, newFavoriteState);
    }
    
    toast.success(
      newFavoriteState ? "Added to favorites!" : "Removed from favorites!",
      { duration: 2000 }
    );
  };

  const handleFavoriteFromDialog = (promptId: number, isFav: boolean) => {
    setFavorite(isFav);
    if (onToggleFavorite) {
      onToggleFavorite(promptId, isFav);
    }
  };

  const handleCardClick = () => {
    setDetailOpen(true);
  };

  return (
    <>
      <article 
        className="group cursor-pointer border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-card h-fit hover:border-primary/20"
        onClick={handleCardClick}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Badge variant="secondary" className="text-xs">{category}</Badge>
              <h3 className="font-medium leading-tight group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                className={`h-8 w-8 p-0 ${favorite ? 'text-red-500' : ''}`}
                onClick={toggleFavorite}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopy}
                className="h-8 w-8 p-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-md p-3 border-l-2 border-primary/30">
              <p className="text-sm font-mono leading-relaxed line-clamp-3">
                {prompt}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="w-3 h-3" />
                <span className="font-medium">Use Case</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {useCase}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    +{tags.length - 2}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{dateAdded}</span>
            </div>
          </div>
        </div>
      </article>

      <PromptDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        title={title}
        prompt={prompt}
        useCase={useCase}
        category={category}
        tags={tags}
        dateAdded={dateAdded}
        isFavorite={favorite}
        id={id}
        onToggleFavorite={handleFavoriteFromDialog}
      />
    </>
  );
}