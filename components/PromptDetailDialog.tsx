import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, Heart, BookOpen, Calendar, Hash, Clock, Type, Eye } from "lucide-react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

interface PromptDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  prompt: string;
  useCase: string;
  category: string;
  tags: string[];
  dateAdded: string;
  isFavorite?: boolean;
  id?: string;
  onToggleFavorite?: (id: string) => void;
}

export function PromptDetailDialog({
  open,
  onOpenChange,
  title,
  prompt,
  useCase,
  category,
  tags,
  dateAdded,
  isFavorite = false,
  id,
  onToggleFavorite
}: PromptDetailDialogProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Sync favorite state when prop changes
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  // Set initial content when dialog opens
  useEffect(() => {
    if (open && contentEditableRef.current) {
      contentEditableRef.current.textContent = prompt;
    }
  }, [open, prompt]);

  const handleCopy = () => {
    const text = contentEditableRef.current?.textContent || '';
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard!", {
      duration: 2000,
    });
  };

  const toggleFavorite = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (!id || !onToggleFavorite) return;
    
    // Optimistic update
    setFavorite(!favorite);
    
    try {
      await onToggleFavorite(id);
    } catch (error) {
      // Revert on error
      setFavorite(!favorite);
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorite status');
    }
  };

  // Calculate metadata
  const wordCount = prompt.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = prompt.length;
  const charCountNoSpaces = prompt.replace(/\s/g, '').length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
  const placeholderCount = (prompt.match(/\[.*?\]/g) || []).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Badge variant="secondary" className="w-fit">{category}</Badge>
                <DialogTitle className="text-left leading-tight">
                  {title}
                </DialogTitle>
              </div>
            </div>
            
            {/* Action buttons moved here for better accessibility */}
            <div className="flex items-center gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                className={`flex items-center gap-2 ${favorite ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(e);
                }}
                onMouseDown={e => e.stopPropagation()}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Prompt
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Prompt */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">Prompt</h3>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary/50 max-h-[300px] overflow-y-auto">
              <div 
                ref={contentEditableRef}
                className="font-mono leading-relaxed text-sm whitespace-pre-wrap outline-none focus:ring-1 focus:ring-primary/50 focus:ring-offset-1 rounded p-1 -m-1 transition-colors text-left"
                contentEditable
                dir="ltr"
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: prompt }}
              />
            </div>
          </div>

          <Separator />

          {/* Use Case */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">Use Case</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {useCase}
            </p>
          </div>

          <Separator />

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">Tags</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">Details</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Words
                </p>
                <p className="text-lg font-semibold">
                  {wordCount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Characters
                </p>
                <p className="text-lg font-semibold">
                  {charCount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Placeholders
                </p>
                <p className="text-lg font-semibold">
                  {placeholderCount}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Read Time
                </p>
                <p className="text-lg font-semibold">
                  {readingTime}m
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Footer Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Added on {dateAdded}</span>
            </div>
            {id && (
              <div className="flex items-center gap-2">
                <span>ID: #{id}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}