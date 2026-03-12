// components/NewsList.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import SkeletonCard from "./SkeletonCard";
import ErrorBox from "./ErrorBox";
import type { NewsArticle } from "@/lib/news";
import { fetcher } from "@/lib/fetcher";

export default function NewsList() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher("/api/news");
      if (data?.articles) setArticles(data.articles as NewsArticle[]);
      else setError(data?.error ?? "No data");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) return <ErrorBox message={error} onRetry={() => load()} />;

  if (!articles.length) return <div className="text-sm text-muted">No news available</div>;

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0.8, ease: "backOut" }}
    >
      {articles.slice(0, 4).map((a) => (
        <NewsCard key={a.id} article={a} />
      ))}
    </motion.div>
  );
}