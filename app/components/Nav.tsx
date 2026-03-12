"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: t.home },
    { href: "#upcoming-matches", label: t.events },
    { href: "#latest-news", label: t.news },
    { href: "/members", label: t.members },
  ];

  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href.startsWith("#")) {
      if (typeof window === "undefined") return false;
      return window.location.hash === href;
    }
    return pathname === href;
  };

  return (
    <header className="w-full sticky top-0 z-50 border-b" style={{ background: "var(--color-black)" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between py-3 md:py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <Image
                src="/club-crest.svg"
                alt="Club crest"
                width={56}
                height={56}
                priority
                className="block w-auto h-auto"
            />
          </div>
          <span className="sr-only">{t.clubTitle} - {t.clubSubtitle}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = isLinkActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium uppercase tracking-[0.08em] px-1 pb-2"
                style={{
                  color: "var(--color-white)",
                  borderBottom: "2px solid",
                  borderBottomColor: active ? "var(--color-primary)" : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href="/join" className="ml-4 btn-primary text-white px-3 py-1 text-sm">Join</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring"
          style={{ color: "var(--color-white)" }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        <aside
          className={`absolute top-0 left-0 h-full w-72 bg-background p-4 shadow-lg transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-semibold">{t.clubTitle}</div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1">
              <X />
            </button>
          </div>
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium uppercase tracking-[0.08em]"
                style={{ color: "var(--color-white)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/join" onClick={() => setOpen(false)} className="mt-4 btn-primary text-white px-3 py-2 rounded text-center">Join</Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
