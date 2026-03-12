"use client";

import { useState } from "react";
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
  // Track which exact src has errored so the failure doesn't persist across different derived sources
  const [trackedErroredSrc, setTrackedErroredSrc] = useState<string | null>(null);
  const derived = src ?? (name ? `/images/crests/${slug}.png` : defaultSrc);
  // Only use the fallback when the tracked errored src matches the current derived src
  const imgSrc = trackedErroredSrc === derived ? defaultSrc : derived;

  return (
    <Image
      src={imgSrc}
      alt={name ?? "club crest"}
      width={size}
      height={size}
      className="object-contain"
      onError={() => {
        if (derived !== defaultSrc) setTrackedErroredSrc(derived);
      }}
      style={{ width: size, height: size, display: "block" }}
    />
  );
}
