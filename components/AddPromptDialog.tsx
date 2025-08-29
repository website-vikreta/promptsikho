"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Plus, X, Loader2 } from "lucide-react";
import { createPrompt, SanityPrompt } from "@/sanity/lib/queries";
import { toast } from "sonner";

interface AddPromptDialogProps {
  onPromptAdded: (prompt: SanityPrompt) => void;
}

const categories = ["Marketing", "Coding", "Writing", "Business", "Design"] as const;

type FormErrors = {
  title?: string;
  prompt?: string;
  useCase?: string;
  category?: string;
  tags?: string;
};

export function AddPromptDialog({ onPromptAdded }: AddPromptDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Form state
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const resetForm = () => {
    setTitle('');
    setPrompt('');
    setUseCase('');
    setCategory('');
    setTags([]);
    setNewTag('');
    setErrors({});
  };

  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
      // Clear tag error if any
      if (errors.tags) {
        setErrors(prev => ({ ...prev, tags: undefined }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    
    // Update tag error if needed
    if (newTags.length === 0) {
      setErrors(prev => ({ ...prev, tags: 'At least one tag is required' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!prompt.trim()) {
      newErrors.prompt = 'Prompt text is required';
    }
    
    if (!useCase.trim()) {
      newErrors.useCase = 'Use case is required';
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newPrompt = await createPrompt({
        title: title.trim(),
        prompt: prompt.trim(),
        useCase: useCase.trim(),
        category: category.trim(),
        tags: tags.map(tag => tag.trim().toLowerCase()),
        isFavorite: false,
        featured: false
      });
      
      toast.success('Prompt created successfully!');
      onPromptAdded(newPrompt);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast.error('Failed to create prompt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim() && prompt.trim() && useCase.trim() && category && tags.length > 0;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetForm();
      }
    }}>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title <span className="text-red-500">*</span>
                </Label>
                {errors.title && (
                  <span className="text-sm text-red-500">{errors.title}</span>
                )}
              </div>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your prompt"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors(prev => ({ ...prev, title: undefined }));
                  }
                }}
                className={`${errors.title ? 'border-red-500' : ''} focus-visible:ring-2 focus-visible:ring-blue-500`}
                disabled={isSubmitting}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category <span className="text-red-500">*</span>
                </Label>
                {errors.category && (
                  <span className="text-sm text-red-500">{errors.category}</span>
                )}
              </div>
              <Select 
                value={category} 
                onValueChange={(value) => {
                  setCategory(value);
                  if (errors.category) {
                    setErrors(prev => ({ ...prev, category: undefined }));
                  }
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger 
                  className={`${errors.category ? 'border-red-500' : ''} focus:ring-2 focus:ring-blue-500`}
                  aria-invalid={!!errors.category}
                >
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

            {/* Prompt Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prompt <span className="text-red-500">*</span>
                </Label>
                {errors.prompt && (
                  <span className="text-sm text-red-500">{errors.prompt}</span>
                )}
              </div>
              <Textarea
                id="prompt"
                placeholder="Enter your prompt text. Use [brackets] for placeholders that users should replace."
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (errors.prompt) {
                    setErrors(prev => ({ ...prev, prompt: undefined }));
                  }
                }}
                className={`min-h-[150px] ${errors.prompt ? 'border-red-500' : ''} focus-visible:ring-2 focus-visible:ring-blue-500`}
                disabled={isSubmitting}
                aria-invalid={!!errors.prompt}
                aria-describedby={errors.prompt ? 'prompt-error' : undefined}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use [brackets] to indicate placeholders that users should replace with their own content.
              </p>
            </div>

            {/* Use Case Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="useCase" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Use Case <span className="text-red-500">*</span>
                </Label>
                {errors.useCase && (
                  <span className="text-sm text-red-500">{errors.useCase}</span>
                )}
              </div>
              <Textarea
                id="useCase"
                placeholder="Describe when and how this prompt is most useful"
                value={useCase}
                onChange={(e) => {
                  setUseCase(e.target.value);
                  if (errors.useCase) {
                    setErrors(prev => ({ ...prev, useCase: undefined }));
                  }
                }}
                className={`min-h-[100px] ${errors.useCase ? 'border-red-500' : ''} focus-visible:ring-2 focus-visible:ring-blue-500`}
                disabled={isSubmitting}
                aria-invalid={!!errors.useCase}
                aria-describedby={errors.useCase ? 'usecase-error' : undefined}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Explain the ideal scenario for using this prompt.
              </p>
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags <span className="text-red-500">*</span>
                </Label>
                {errors.tags && (
                  <span className="text-sm text-red-500">{errors.tags}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag and press Enter"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className={`${errors.tags ? 'border-red-500' : ''} focus-visible:ring-2 focus-visible:ring-blue-500`}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.tags}
                  aria-describedby={errors.tags ? 'tags-error' : undefined}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddTag}
                  disabled={!newTag.trim() || isSubmitting}
                  aria-label="Add tag"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-10 mt-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="flex items-center gap-1 group px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground self-center">
                    {errors.tags ? (
                      <span className="text-red-500">Please add at least one tag</span>
                    ) : (
                      'Add tags to help users find this prompt (e.g., "email", "marketing", "social")'
                    )}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Add relevant tags to help users discover your prompt.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="min-w-[120px] px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Prompt'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}