import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export function BlogCard({ 
  title, 
  excerpt, 
  author, 
  date, 
  readTime, 
  category, 
  imageUrl, 
  featured = false 
}: BlogCardProps) {
  return (
    <article className={`group cursor-pointer ${featured ? 'md:col-span-2' : ''}`}>
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg">
          <ImageWithFallback 
            src={imageUrl}
            alt={title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              featured ? 'h-[300px]' : 'h-[200px]'
            }`}
          />
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
          >
            {category}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <h3 className={`font-semibold leading-tight group-hover:text-primary transition-colors ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}