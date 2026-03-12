import type { NewsArticle } from "@/lib/news";
import Image from "next/image";

const NewsCard = ({ article }: { article: NewsArticle }) => {
  const formatted = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const stripHtml = (s?: string) => (s ? s.replace(/<[^>]*>/g, "") : "");

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="card">
      {article.imageUrl && (
        <div className="w-full">
          <div className="img-16-9 relative w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              className="object-cover object-top"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="section-label">{article.source}</span>
        </div>

        <div className="flex items-center gap-2 mb-2 text-xs">
          <span className="font-semibold" style={{ color: "var(--color-white)" }}>{formatted}</span>
          <span style={{ color: "var(--color-grey)" }}>·</span>
          <span className="text-muted">{article.source}</span>
        </div>

        <h3 className="card-title mb-2">{article.title}</h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">{stripHtml(article.description)}</p>
      </div>
    </a>
  );
};

export default NewsCard;