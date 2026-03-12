const MAP_QUERY = encodeURIComponent("Via Laietana 44, Ciutat Vella, 08003 Barcelona");

export default function WhereWeWatch() {
  return (
    <section id="where-we-watch" className="mt-4 md:mt-6">
      <h2 className="section-title text-black mb-4">Where We Watch</h2>

      <div className="card p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <h3 className="card-title text-white mb-2">McCarthy&apos;s Bar</h3>
            <div className="meta mb-3">Via Laietana, 44, Ciutat Vella, 08003 Barcelona</div>
            <p className="text-sm text-muted mb-3">We gather at McCarthy&apos;s Bar to watch Manchester United matches with a lively, friendly crowd and great atmosphere. The venue offers screens, food and a strong community vibe — perfect for matchdays.</p>
          </div>

          <div className="md:col-span-1">
            <div className="img-16-9 overflow-hidden rounded-sm">
              <iframe
                title="McCarthy's Bar map"
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
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
