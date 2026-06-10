"use client";

import { useState, useMemo } from "react";
import { events } from "./data/events";
import { Event } from "./types/event";

// ─── helpers ──────────────────────────────────────────────────────────────────

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr + "T00:00:00");
  return Math.ceil((eventDate.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const TYPE_STYLE: Record<string, { border: string; badge: string; dot: string }> = {
  Presencial: {
    border: "border-l-blue-500",
    badge: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
  Virtual: {
    border: "border-l-violet-500",
    badge: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
  },
  Hibrido: {
    border: "border-l-cyan-500",
    badge: "bg-cyan-50 text-cyan-700",
    dot: "bg-cyan-500",
  },
};

const TAG_LABELS: Record<string, string> = {
  "ciberseguridad": "Ciberseguridad",
  "ethical-hacking": "Ethical Hacking",
  "pentesting": "Pentesting",
  "software": "Software",
  "sistemas": "Sistemas",
  "ia": "IA",
  "machine-learning": "ML",
  "cloud": "Cloud",
  "aws": "AWS",
  "devops": "DevOps",
  "nodejs": "Node.js",
  "apis": "APIs",
  "web": "Web",
  "mobile": "Mobile",
  "redes": "Redes",
  "data-science": "Data Science",
};

// ─── EventCard ────────────────────────────────────────────────────────────────

function EventCard({ event, past }: { event: Event; past?: boolean }) {
  const days = getDaysUntil(event.date);
  const style = TYPE_STYLE[event.type];

  return (
    <article
      className={`
        bg-white rounded-xl border border-slate-200 border-l-4 ${style.border}
        flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200
        ${past ? "opacity-55" : ""}
      `}
    >
      {/* Image */}
      {event.image_url && (
        <div className="w-full h-36 overflow-hidden rounded-t-xl border-b border-slate-100">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Top row: tipo + días */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {event.type}
          </span>
          {!past && days >= 0 && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              days === 0
                ? "bg-red-50 text-red-600"
                : days <= 7
                ? "bg-amber-50 text-amber-600"
                : "bg-indigo-50 text-indigo-600"
            }`}>
              {days === 0 ? "¡Hoy!" : days === 1 ? "Mañana" : `En ${days} días`}
            </span>
          )}
          {past && (
            <span className="text-xs text-slate-400">Finalizado</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 leading-snug">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {event.description}
        </p>

        {/* Date + Time */}
        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="capitalize">{formatDate(event.date)}</span>
          <span className="text-slate-300">·</span>
          <span>{event.time}h</span>
        </div>

        {/* Location */}
        {event.location && (
          <div className="flex items-start gap-1.5 text-sm text-slate-600">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        )}

        {/* Meeting URL */}
        {event.meeting_url && (
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <a href={event.meeting_url} target="_blank" rel="noopener noreferrer"
               className="text-indigo-600 hover:underline truncate">
              {event.meeting_url}
            </a>
          </div>
        )}

        {/* Organizer */}
        {event.organizer && (
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.organizer}</span>
          </div>
        )}

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {TAG_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          event.is_free
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }`}>
          {event.is_free ? "Gratuito" : event.price ?? "De pago"}
        </span>

        {!past && event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            Registrarse
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
        {!past && !event.registration_url && (
          <span className="text-xs text-slate-400">Entrada libre</span>
        )}
      </div>
    </article>
  );
}

// ─── Filters ──────────────────────────────────────────────────────────────────

const FILTERS = ["Todos", "Presencial", "Virtual", "Hibrido"] as const;
type Filter = (typeof FILTERS)[number];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todos");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = useMemo(
    () => [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  );

  const upcoming = sorted.filter((e) => new Date(e.date + "T00:00:00") >= today);
  const past = sorted.filter((e) => new Date(e.date + "T00:00:00") < today).reverse();

  const filtered = useMemo(
    () =>
      activeFilter === "Todos"
        ? upcoming
        : upcoming.filter((e) => e.type === activeFilter),
    [activeFilter, upcoming]
  );

  return (
    <main className="min-h-screen bg-slate-50 font-sans">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">U</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">USIL</p>
              <p className="text-xs text-slate-400">Eventos Tech</p>
            </div>
          </div>
          <a
            href="https://github.com/piero-mz/eventos-usil/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Publicar evento
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
            Universidad San Ignacio de Loyola
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Eventos Tech en USIL
          </h1>
          <p className="text-slate-500 max-w-xl text-base mb-6 leading-relaxed">
            Conferencias, talleres y charlas de Sistemas, Software, Ciberseguridad,
            IA y más — organizados por y para la comunidad USIL.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/piero-mz/eventos-usil/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Proponer un evento
            </a>
            <a
              href="https://github.com/piero-mz/eventos-usil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Ver repositorio
            </a>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Upcoming events */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl bg-white">
            <p className="text-slate-400 font-medium">
              No hay eventos próximos{activeFilter !== "Todos" ? ` de tipo "${activeFilter}"` : ""}.
            </p>
            <p className="text-slate-400 text-sm mt-1">
              ¿Organizas uno?{" "}
              <a
                href="https://github.com/piero-mz/eventos-usil/issues/new/choose"
                className="text-indigo-500 hover:underline"
              >
                Publícalo aquí →
              </a>
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4">
              Próximos — {filtered.length} evento{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <div className="mt-14">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4">
              Eventos pasados
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event, i) => (
                <EventCard key={i} event={event} past />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>Mantenido por la comunidad USIL</p>
          <a
            href="https://github.com/piero-mz/eventos-usil/issues/new/choose"
            className="text-indigo-500 hover:text-indigo-700 transition-colors font-medium"
          >
            + Publicar un evento
          </a>
        </div>
      </footer>

    </main>
  );
}
