"use client";
import { PromptCard } from "./PromptCard";
import { Badge } from "./ui/badge";
import { useState } from "react";

const promptData = [
  {
    id: 1,
    title: "Email Subject Line Generator",
    prompt: "Create 5 compelling email subject lines for [product/service] that increase open rates. The email is about [specific topic/offer]. Target audience: [describe audience]. Tone should be [professional/casual/urgent]. Include power words and avoid spam triggers.",
    useCase: "Perfect for email marketers who need to create high-converting subject lines that stand out in crowded inboxes.",
    category: "Marketing",
    tags: ["email", "copywriting", "conversion"],
    dateAdded: "Mar 15, 2024",
    isFavorite: true,
    featured: true
  },
  {
    id: 2,
    title: "Code Review Assistant",
    prompt: "Review this code for potential issues, bugs, and improvements. Focus on: 1) Security vulnerabilities 2) Performance optimizations 3) Code readability 4) Best practices 5) Potential edge cases. Provide specific suggestions with examples: [paste your code here]",
    useCase: "Ideal for developers who want thorough code reviews to improve code quality and catch bugs early.",
    category: "Coding",
    tags: ["code-review", "debugging", "optimization"],
    dateAdded: "Mar 12, 2024",
    isFavorite: false
  },
  {
    id: 3,
    title: "Creative Story Starter",
    prompt: "Generate a unique story beginning with these elements: Genre: [specify genre], Main character: [brief description], Setting: [time/place], Central conflict: [describe challenge]. Include an intriguing opening line and establish the mood.",
    useCase: "Great for writers experiencing creative block who need inspiration and a strong foundation for their stories.",
    category: "Writing",
    tags: ["creative-writing", "storytelling", "inspiration"],
    dateAdded: "Mar 10, 2024",
    isFavorite: true
  },
  {
    id: 4,
    title: "Business Strategy Framework",
    prompt: "Help me develop a strategic plan for [business challenge/opportunity]. Analyze: 1) Current situation 2) Market conditions 3) Competitive landscape 4) Resource requirements 5) Risk assessment. Provide actionable recommendations with timeline.",
    useCase: "Essential for entrepreneurs and business leaders who need structured approach to strategic planning.",
    category: "Business",
    tags: ["strategy", "planning", "analysis"],
    dateAdded: "Mar 8, 2024",
    isFavorite: false
  },
  {
    id: 5,
    title: "UI/UX Design Critique",
    prompt: "Analyze this design for user experience and interface effectiveness. Evaluate: 1) Visual hierarchy 2) User flow 3) Accessibility 4) Mobile responsiveness 5) Brand consistency. Suggest specific improvements: [describe or attach design]",
    useCase: "Valuable for designers seeking objective feedback on their work to improve usability and aesthetic appeal.",
    category: "Design",
    tags: ["ui-ux", "feedback", "usability"],
    dateAdded: "Mar 6, 2024",
    isFavorite: false
  },
  {
    id: 6,
    title: "Social Media Content Planner",
    prompt: "Create a week's worth of social media content for [brand/business]. Platform: [Instagram/LinkedIn/Twitter]. Target audience: [describe]. Goals: [brand awareness/engagement/sales]. Include post captions, hashtags, and posting times.",
    useCase: "Perfect for social media managers and small business owners who need consistent, engaging content.",
    category: "Marketing",
    tags: ["social-media", "content-planning", "engagement"],
    dateAdded: "Mar 4, 2024",
    isFavorite: true
  },
  {
    id: 7,
    title: "Meeting Notes Summarizer",
    prompt: "Summarize these meeting notes into key points, action items, and decisions made. Format: 1) Main topics discussed 2) Key decisions 3) Action items with owners 4) Next steps. Make it concise and actionable: [paste meeting notes]",
    useCase: "Saves time for busy professionals who need to quickly distill meeting content into actionable insights.",
    category: "Business",
    tags: ["meetings", "productivity", "organization"],
    dateAdded: "Mar 2, 2024",
    isFavorite: false
  },
  {
    id: 8,
    title: "Bug Report Generator",
    prompt: "Create a detailed bug report for this issue. Include: 1) Steps to reproduce 2) Expected vs actual behavior 3) Environment details 4) Severity level 5) Potential impact. Issue description: [describe the bug you encountered]",
    useCase: "Helps developers and QA testers create comprehensive bug reports that lead to faster resolution.",
    category: "Coding",
    tags: ["bug-reporting", "qa", "testing"],
    dateAdded: "Feb 28, 2024",
    isFavorite: true
  }
];

const categories = ["All", "Marketing", "Coding", "Writing", "Business", "Design"];

export function PromptGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPrompts = selectedCategory === "All" 
    ? promptData 
    : promptData.filter(prompt => prompt.category === selectedCategory);

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === selectedCategory ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Prompts Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt, index) => (
          <PromptCard
            key={prompt.id}
            title={prompt.title}
            prompt={prompt.prompt}
            useCase={prompt.useCase}
            category={prompt.category}
            tags={prompt.tags}
            dateAdded={prompt.dateAdded}
            isFavorite={prompt.isFavorite}
            featured={false}
          />
        ))}
      </div>
      
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No prompts found in this category.
        </div>
      )}
    </section>
  );
}