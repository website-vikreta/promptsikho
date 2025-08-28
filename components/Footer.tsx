import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">PromptVault</h3>
            <p className="text-muted-foreground">
              Your personal repository for high-quality prompts. Organize, search, and discover prompts for every creative and professional need.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Actions</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Add New Prompt</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Browse All</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">My Favorites</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Recently Added</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Export Collection</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Writing & Content</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Marketing & Sales</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Coding & Development</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Business Strategy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Design & Creative</a></li>
            </ul>
          </div>
          
          {/* Backup & Sync */}
          <div className="space-y-4">
            <h4 className="font-semibold">Backup & Sync</h4>
            <p className="text-muted-foreground text-sm">
              Never lose your prompts. Keep your collection synced across devices.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Export Backup
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Import Prompts
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 PromptVault. Your personal prompt library.</p>
        </div>
      </div>
    </footer>
  );
}