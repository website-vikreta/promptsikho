import { Header } from "@/components/Header";
import { PromptGrid } from "@/components/PromptGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PromptGrid />
      </main>
    </div>
  );
}