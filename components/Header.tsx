import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { AddPromptDialog } from "./AddPromptDialog";
import { SanityPrompt } from "@/sanity/lib/queries";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPromptAdded: (prompt: SanityPrompt) => void;
}

export function Header({ searchQuery, onSearchChange, onPromptAdded }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">PromptSikho</h1>
        
        <div className="flex-1 max-w-2xl px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search prompts..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <AddPromptDialog onPromptAdded={onPromptAdded} />
        </div>
      </div>
    </header>
  );
}