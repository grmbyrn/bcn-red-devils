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
  const initial = src ?? (name ? `/images/crests/${slug}.png` : defaultSrc);
  const [current, setCurrent] = useState(initial);

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
