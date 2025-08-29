"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import PromptGrid from "@/components/PromptGrid";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddPrompt = (prompt: {
    title: string;
    prompt: string;
    useCase: string;
    category: string;
    tags: string[];
  }) => {
    // Force re-render by updating key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddPrompt={handleAddPrompt} />
      <main>
        <PromptGrid key={refreshKey} onAddPrompt={handleAddPrompt} />
      </main>
    </div>
  );
}