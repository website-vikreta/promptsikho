import { BlogCard } from "./BlogCard";
import { Button } from "./ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Building Responsive Layouts with CSS Grid",
    excerpt: "Learn how to create flexible and responsive layouts using CSS Grid. This comprehensive guide covers everything from basic concepts to advanced techniques.",
    author: "Mike Chen",
    date: "Mar 12, 2024",
    readTime: "6 min read",
    category: "CSS",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "React Server Components Explained",
    excerpt: "Dive deep into React Server Components and understand how they're revolutionizing the way we build React applications.",
    author: "Emma Davis",
    date: "Mar 10, 2024",
    readTime: "8 min read",
    category: "React",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "TypeScript Best Practices for 2024",
    excerpt: "Essential TypeScript patterns and practices that every developer should know to write better, more maintainable code.",
    author: "Alex Rodriguez",
    date: "Mar 8, 2024",
    readTime: "5 min read",
    category: "TypeScript",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "The Art of API Design",
    excerpt: "Creating APIs that developers love to use requires careful planning and consideration of user experience.",
    author: "Sarah Johnson",
    date: "Mar 6, 2024",
    readTime: "7 min read",
    category: "API",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Modern JavaScript Testing Strategies",
    excerpt: "Explore the latest testing frameworks and methodologies to ensure your JavaScript applications are robust and reliable.",
    author: "David Kim",
    date: "Mar 4, 2024",
    readTime: "9 min read",
    category: "Testing",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Performance Optimization Techniques",
    excerpt: "Practical tips and techniques to improve your web application's performance and user experience.",
    author: "Lisa Wang",
    date: "Mar 2, 2024",
    readTime: "6 min read",
    category: "Performance",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  }
];

export function BlogGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up to date with the latest trends, tutorials, and insights from the world of web development and design.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
            date={post.date}
            readTime={post.readTime}
            category={post.category}
            imageUrl={post.imageUrl}
            featured={index === 0}
          />
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </section>
  );
}