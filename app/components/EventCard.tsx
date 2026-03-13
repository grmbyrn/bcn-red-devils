"use client"
import { MapPin, Clock, Users, Check } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../lib/i18n";
import type { MatchEvent } from "@/mock-data";

const EventCard = ({ event }: { event: MatchEvent }) => {
  const { t } = useI18n();
  const [rsvp, setRsvp] = useState(false);
  const [count, setCount] = useState(event.attendees);

  const handleRsvp = () => {
    setRsvp(!rsvp);
    setCount((c) => (rsvp ? c - 1 : c + 1));
  };

  const dateObj = new Date(event.date + "T" + event.time);
  const dayName = dateObj.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
  const dayNum = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

  return (
    <div className="card">
      <div className="flex">
        {/* Date column */}
        <div className="flex flex-col items-center justify-center px-4 py-4 bg-transparent min-w-18">
          <span className="text-[10px] font-semibold text-muted tracking-widest">{dayName}</span>
          <span className="text-2xl font-bold font-display text-foreground">{dayNum}</span>
          <span className="text-[10px] font-semibold text-muted tracking-widest">{month}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="section-label">{event.competition}</span>
            {event.isLive && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                <span style={{ width: 6, height: 6, borderRadius: 4, backgroundColor: "var(--color-primary)" }} /> LIVE
              </span>
            )}
          </div>

          <h3 className="card-title">
            {event.homeTeam} <span className="text-muted">vs</span> {event.awayTeam}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {event.venue}
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-xs text-muted">
              <Users size={12} /> {count} {t.attendees}
            </span>
            <button onClick={handleRsvp} className={`${rsvp ? "btn-primary" : "btn-secondary"} flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide` }>
              {rsvp && <Check size={12} />}
              {rsvp ? t.going : t.imGoing}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
