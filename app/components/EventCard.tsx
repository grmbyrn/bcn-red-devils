"use client"
import { MapPin, Clock, Users, Check } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { MatchEvent } from "@/lib/mock-data";

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
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-colors">
      <div className="flex">
        {/* Date column */}
        <div className="flex flex-col items-center justify-center px-4 py-4 bg-secondary min-w-[72px]">
          <span className="text-[10px] font-semibold text-muted-foreground tracking-widest">{dayName}</span>
          <span className="text-2xl font-bold font-display text-foreground">{dayNum}</span>
          <span className="text-[10px] font-semibold text-muted-foreground tracking-widest">{month}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">{event.competition}</span>
            {event.isLive && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-primary animate-pulse-red">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> LIVE
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-bold text-foreground leading-tight">
            {event.homeTeam} <span className="text-muted-foreground">vs</span> {event.awayTeam}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {event.venue}
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users size={12} /> {count} {t.attendees}
            </span>
            <button
              onClick={handleRsvp}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide transition-all ${
                rsvp
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary"
              }`}
            >
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
