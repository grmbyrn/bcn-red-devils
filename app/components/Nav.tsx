"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import Link from "next/link";
import { useI18n } from "../lib/i18n";
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";

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
    { href: "#upcoming-matches", label: t.upcoming },
    { href: "#latest-news", label: t.latestNews },
    { href: "#join-us", label: t.joinUs },
  ];

  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.pathname : ""
  );
  const [currentHash, setCurrentHash] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onHash = () => setCurrentHash(window.location.hash);
    const onPop = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(t);
  }, []);

  const isLinkActive = (href: string) => {
    if (href.startsWith("#")) return currentHash === href;
    return currentPath === href;
  };

  return (
    <header className="w-full border-b" style={{ background: "var(--color-black)" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between py-3 md:py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <Image src="/club-crest.svg" alt="Club crest" width={46} height={46} priority className="block" />
          </div>
          <span className="sr-only">{t.clubTitle} - {t.clubSubtitle}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = hydrated && isLinkActive(l.href);
            const base = "text-[13px] font-medium uppercase tracking-[0.08em] px-1 pb-2 border-b-2 border-b-transparent";
            const activeClass = "border-b-[var(--color-primary)]";
            return (
              <Link key={l.href} href={l.href} className={`${base} ${active ? activeClass : ""}`} style={{ color: "var(--color-white)" }}>
                {l.label}
              </Link>
            );
          })}
          <LanguageToggle />
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
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden={!open}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside
          className={`absolute top-6 left-0 h-[calc(100%-3rem)] w-11/12 max-w-xs sm:max-w-sm bg-background/95 p-6 rounded-r-lg shadow-lg transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-end mb-4 gap-2">
            <LanguageToggle compact />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1">
              <X />
            </button>
          </div>
          <nav className="flex flex-col divide-y divide-white/6">
            {links.map((l) => (
              <div key={l.href} className="py-3">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-[15px] font-semibold uppercase tracking-[0.06em]"
                  style={{ color: "var(--color-white)" }}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
