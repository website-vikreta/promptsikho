import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { AddPromptDialog } from "./AddPromptDialog";

interface HeaderProps {
  onAddPrompt?: (prompt: {
    title: string;
    prompt: string;
    useCase: string;
    category: string;
    tags: string[];
  }) => void;
}

export function Header({ onAddPrompt }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">PromptSikho</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search prompts..." 
              className="pl-10 w-64 h-8"
            />
          </div>
          {onAddPrompt && <AddPromptDialog onAddPrompt={onAddPrompt} />}
        </div>
      </div>
    </header>
  );
}