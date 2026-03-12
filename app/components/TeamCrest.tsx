"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function slugify(name?: string | null) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TeamCrest({ name, src, size = 40 }: { name?: string | null; src?: string | null; size?: number }) {
  const defaultSrc = "/club-crest.svg";
  const slug = slugify(name || "");
  const [current, setCurrent] = useState<string>(() => src ?? (name ? `/images/crests/${slug}.png` : defaultSrc));

  useEffect(() => {
    const initial = src ?? (name ? `/images/crests/${slug}.png` : defaultSrc);
    const t = setTimeout(() => setCurrent(initial), 0);
    return () => clearTimeout(t);
  }, [src, name, slug]);

  return (
    <Image
      src={current}
      alt={name ?? "club crest"}
      width={size}
      height={size}
      className="object-contain"
      onError={() => {
        if (current !== defaultSrc) setCurrent(defaultSrc);
      }}
      style={{ width: size, height: size, display: "block" }}
    />
  );
}
