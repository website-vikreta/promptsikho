"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Plus, X } from "lucide-react";

interface AddPromptDialogProps {
  onAddPrompt: (prompt: {
    title: string;
    prompt: string;
    useCase: string;
    category: string;
    tags: string[];
  }) => void;
}

const categories = ["Marketing", "Coding", "Writing", "Business", "Design"];

export function AddPromptDialog({ onAddPrompt }: AddPromptDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !prompt.trim() || !useCase.trim() || !category) {
      return;
    }

    onAddPrompt({
      title: title.trim(),
      prompt: prompt.trim(),
      useCase: useCase.trim(),
      category,
      tags
    });

    // Reset form
    setTitle("");
    setPrompt("");
    setUseCase("");
    setCategory("");
    setTags([]);
    setNewTag("");
    setOpen(false);
  };

  const isFormValid = title.trim() && prompt.trim() && useCase.trim() && category;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a descriptive title for your prompt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

           <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="w-full">
               <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
               {categories.map((cat) => (
                 <SelectItem key={cat} value={cat}>
                  {cat}
                 </SelectItem>
               ))}
              </SelectContent>
            </Select>
           </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt text. Use [brackets] for placeholders that users should replace."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase">Use Case</Label>
            <Textarea
              id="useCase"
              placeholder="Describe when and how this prompt is most useful"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1"
              />
              <Button type="button" onClick={handleAddTag} size="sm" variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Add Prompt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}