// components/NewsList.tsx
"use client";

import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/lib/news";

export default function NewsList() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (data.articles) setArticles(data.articles);
        else setError(data.error ?? "No data");
      })
      .catch((e: unknown) => {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-sm text-red-600">{error}</div>;
  if (!articles.length) return <div className="text-sm text-muted">No news available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.slice(0, 4).map((a) => (
        <NewsCard key={a.id} article={a} />
      ))}
    </div>
  );
}