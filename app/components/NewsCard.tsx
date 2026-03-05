import type { NewsPost } from "@/lib/mock-data";

const NewsCard = ({ post }: { post: NewsPost }) => {
  const dateObj = new Date(post.date);
  const formatted = dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">{formatted}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-[10px] text-muted-foreground">{post.author}</span>
      </div>
      <h3 className="font-display text-base font-bold text-foreground leading-tight mb-2">{post.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.body}</p>
    </div>
  );
};

export default NewsCard;
