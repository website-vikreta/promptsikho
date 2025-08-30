"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import PromptGrid from "@/components/PromptGrid";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePromptAdded = () => {
    // The actual refresh is now handled in the PromptGrid component
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onPromptAdded={handlePromptAdded}
      />
      <main className="pt-4">
        <PromptGrid 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onPromptAdded={handlePromptAdded}
        />
      </main>
    </div>
  );
}