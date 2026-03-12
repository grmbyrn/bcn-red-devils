"use client";

import { useI18n } from "@/lib/i18n";

export default function WhereWeWatch() {
  const { t } = useI18n();
  const MAP_QUERY = encodeURIComponent(t.whereWeWatch.address);

  return (
    <section id="where-we-watch" className="mt-4 md:mt-6 no-hover">
      <h2 className="section-title text-black mb-4">{t.whereWeWatch.title}</h2>

      <div className="card p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <h3 className="card-title text-white mb-2">{t.whereWeWatch.venueName}</h3>
            <div className="meta mb-3">{t.whereWeWatch.address}</div>
            <p className="text-sm text-muted mb-3">{t.whereWeWatch.description}</p>
          </div>

          <div className="md:col-span-1">
            <div className="img-16-9 overflow-hidden rounded-sm">
              <iframe
                title={`${t.whereWeWatch.venueName} map`}
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, backgroundColor: "transparent" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
