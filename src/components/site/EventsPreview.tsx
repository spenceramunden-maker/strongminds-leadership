import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CTA, Pill } from "@/components/site/kit";
import { CalendarDays, MapPin, Users } from "lucide-react";

export type PublicEvent = {
  id: string;
  title: string;
  division: string;
  category: string;
  event_date: string;
  event_time: string;
  location: string;
  format: string;
  description: string;
  audience: string;
  cost: string;
  capacity: string | null;
  registration_deadline: string | null;
  registration_link: string | null;
  attendance: string;
  status: string;
};

export const FILTERS = [
  "All",
  "Youth Academy",
  "SMILE",
  "Families",
  "Mentors",
  "Information Sessions",
  "Workshops",
  "Saturday Experiences",
  "Parent Night Off",
];

function useEvents() {
  return useQuery({
    queryKey: ["public_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("public_events")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as PublicEvent[];
    },
  });
}

function statusTone(status: string) {
  if (status === "Registration Open") return "bg-gold text-gold-foreground";
  if (status === "Full" || status === "Cancelled") return "bg-destructive/10 text-destructive";
  return "bg-secondary text-secondary-foreground";
}

export function EventCard({ event }: { event: PublicEvent }) {
  return (
    <article className="surface-card flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Pill>{event.division}</Pill>
        <Pill>{event.category}</Pill>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(event.status)}`}
        >
          {event.status}
        </span>
      </div>
      <h3 className="mt-4 text-lg">{event.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>
      <dl className="mt-5 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-gold" aria-hidden />
          <span>
            {event.event_date} · {event.event_time}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-gold" aria-hidden />
          <span>
            {event.format} · {event.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={15} className="text-gold" aria-hidden />
          <span>{event.audience || "Open audience"}</span>
        </div>
      </dl>
      <div className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <p>Cost: {event.cost}</p>
        {event.capacity ? <p>Capacity: {event.capacity}</p> : null}
        {event.registration_deadline ? (
          <p>Registration deadline: {event.registration_deadline}</p>
        ) : null}
        <p>Attendance: {event.attendance}</p>
      </div>
      <div className="mt-5">
        <CTA to="/register" variant="outline">
          Register or Request Details
        </CTA>
      </div>
    </article>
  );
}

export function EventsPreview({ limit }: { limit?: number }) {
  const { data, isLoading, error } = useEvents();
  const events = limit ? (data ?? []).slice(0, limit) : (data ?? []);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading events…</p>;
  }
  if (error) {
    return (
      <p className="text-sm text-muted-foreground">
        Events are temporarily unavailable. Please use the contact form and we will send you the
        current schedule.
      </p>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export function EventsBrowser() {
  const { data, isLoading, error } = useEvents();
  const [filter, setFilter] = useState("All");

  const events = useMemo(() => {
    const all = data ?? [];
    if (filter === "All") return all;
    return all.filter((e) => e.division === filter || e.category === filter);
  }, [data, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f
                ? "border-transparent bg-ink text-ink-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {isLoading ? <p className="text-sm text-muted-foreground">Loading events…</p> : null}
        {error ? (
          <p className="text-sm text-muted-foreground">
            Events are temporarily unavailable. Please use the contact form and we will send you the
            current schedule.
          </p>
        ) : null}
        {!isLoading && !error && events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No events are currently listed in this category. Join an interest list and we will
            notify you when dates are announced.
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}