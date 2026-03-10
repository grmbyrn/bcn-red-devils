// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://content.guardianapis.com/search?q=Manchester+United&section=football&show-fields=headline,thumbnail,trailText,webUrl&page-size=4&api-key=${process.env.GUARDIAN_API_KEY}`,
    { next: { revalidate: 1800 } }
  );

  if (!res.ok) return NextResponse.json({ error: `API error: ${res.status}` }, { status: res.status });

  const data = await res.json();

  type GuardianResult = {
    id: string;
    webUrl?: string;
    webPublicationDate?: string;
    fields?: {
      headline?: string;
      trailText?: string;
      thumbnail?: string;
    } | null;
  };

  const results: GuardianResult[] = Array.isArray(data?.response?.results)
    ? data.response.results
    : [];

  const articles = results.map((a) => ({
    id: a.id,
    title: a.fields?.headline ?? "",
    description: a.fields?.trailText ?? "",
    url: a.webUrl ?? "",
    imageUrl: a.fields?.thumbnail ?? null,
    publishedAt: a.webPublicationDate ?? "",
    source: "The Guardian",
  }));

  return NextResponse.json({ articles });
}