import type { NewsArticle } from "@/lib/news";
import Image from "next/image";

const NewsCard = ({ article }: { article: NewsArticle }) => {
  const formatted = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const stripHtml = (s?: string) => (s ? s.replace(/<[^>]*>/g, "") : "");

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-card rounded-lg border border-border hover:border-primary/30 transition-colors overflow-hidden flex flex-col"
    >
      {article.imageUrl && (
        <div className="relative w-full h-48 md:h-56 lg:h-64">
          <Image
            src={article.imageUrl}
            alt={article.title}
            className="object-cover object-top"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">{formatted}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-[10px] text-muted-foreground">{article.source}</span>
        </div>
        <h3 className="font-display text-base font-bold text-foreground leading-tight mb-2">{article.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{stripHtml(article.description)}</p>
      </div>
    </a>
  );
};

export default NewsCard;