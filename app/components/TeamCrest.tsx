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
  // Track only an errored fallback so we don't update state on prop changes
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const derived = src ?? (name ? `/images/crests/${slug}.png` : defaultSrc);
  const imgSrc = erroredSrc ?? derived;

  return (
    <Image
      src={imgSrc}
      alt={name ?? "club crest"}
      width={size}
      height={size}
      className="object-contain"
      onError={() => {
        if (imgSrc !== defaultSrc) setErroredSrc(defaultSrc);
      }}
      style={{ width: size, height: size, display: "block" }}
    />
  );
}
