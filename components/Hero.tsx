import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <Badge variant="secondary" className="w-fit">Featured Collection</Badge>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Personal Prompt Library
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Store, organize, and discover the perfect prompts for any use case. From creative writing to business strategy, find exactly what you need when inspiration strikes.
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg">Browse Prompts</Button>
            <Button variant="outline" size="lg">Add New Prompt</Button>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>250+ Prompts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>15 Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Always Growing</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
            alt="Person working on creative project with prompts and ideas"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}