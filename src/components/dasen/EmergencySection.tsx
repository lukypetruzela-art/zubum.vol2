"use client";

import { useEffect, useState } from "react";
import { emergencySites } from "@/data/emergency";
import {
  isOpenNow,
  minutesSinceMidnight,
  mondayFirstDow,
  nextOpeningLabel,
  todayClosingLabel,
} from "@/lib/emergency";
import { MapEmbed } from "./MapEmbed";
import { SectionName } from "./SectionName";

type Filter = "all" | "open" | "near";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Všechny pohotovosti" },
  { key: "open", label: "Otevřeno teď" },
  { key: "near", label: "Nejblíž (do 30 km)" },
];

const MAX_KM = 70;
const nearestOverall = [...emergencySites].sort((a, b) => a.distanceKm - b.distanceKm)[0];

const directionsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const embedUrl = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export function EmergencySection() {
  const [now, setNow] = useState<Date | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const sync = () => setNow(new Date());
    sync();
    const timer = setInterval(sync, 60_000);
    return () => clearInterval(timer);
  }, []);

  const mounted = now !== null;
  const dow = now ? mondayFirstDow(now) : 0;
  const minutes = now ? minutesSinceMidnight(now) : 0;

  const openSites = mounted
    ? emergencySites
        .filter((s) => isOpenNow(s, dow, minutes))
        .sort((a, b) => a.distanceKm - b.distanceKm)
    : [];

  const heroSite = openSites[0] ?? nearestOverall;
  const selected =
    (selectedId && emergencySites.find((s) => s.id === selectedId)) || heroSite;

  const filtered = emergencySites.filter((s) => {
    if (filter === "open") return mounted && isOpenNow(s, dow, minutes);
    if (filter === "near") return s.distanceKm <= 30;
    return true;
  });

  return (
    <section id="pohotovost" className="sec emergency">
      <div className="wrap sec-grid">
        <SectionName>Akutní péče</SectionName>
        <div>
          <h2 className="display">Máte akutní problém mimo ordinační dobu?</h2>
          <p className="intro">Podívejte se na seznam dostupných zubních pohotovostí.</p>
        </div>

        <div className="sec-body">
          {/* živý stav */}
          <div className="status" aria-live="polite">
            <span className={`pulse${openSites.length ? " on" : ""}`} aria-hidden />
            <div className="status-text">
              {!now ? (
                <div className="status-when">Zjišťuji aktuální stav pohotovostí…</div>
              ) : (
                <>
                  <div className="status-when">
                    Právě teď · {now.toLocaleDateString("cs-CZ", { weekday: "long" })}{" "}
                    {now.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div className="status-name">
                    {openSites.length
                      ? heroSite.name
                      : "Teď nemá otevřeno žádná pohotovost"}
                  </div>
                  <div className="status-meta">
                    {openSites.length
                      ? `${heroSite.distanceKm} km od Rožnova · otevřeno ${todayClosingLabel(heroSite, dow)}`
                      : `${nextOpeningLabel(nearestOverall, dow, minutes)} — ${nearestOverall.name} (${nearestOverall.distanceKm} km)`}
                  </div>
                </>
              )}
            </div>
            {mounted && (
              <a href={`tel:${heroSite.phoneHref}`} className="btn btn-ink">
                Zavolat {heroSite.phone}
              </a>
            )}
          </div>

          {/* filtry */}
          <div className="filters" role="group" aria-label="Filtr pohotovostí">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* seznam + mapa */}
          <div className="em-grid">
            <ul className="sites">
              {filtered.length === 0 ? (
                <li className="empty">Žádná pohotovost neodpovídá filtru.</li>
              ) : (
                filtered.map((site) => {
                  const open = mounted && isOpenNow(site, dow, minutes);
                  const isSel = site.id === selected.id;
                  return (
                    <li key={site.id} className={`site${isSel ? " sel" : ""}`}>
                      <div className="site-top">
                        <h3>{site.name}</h3>
                        <span className={`chip ${open ? "open" : "shut"}`}>
                          {!mounted ? "…" : open ? "Otevřeno" : "Zavřeno"}
                        </span>
                      </div>
                      <p className="addr">
                        {site.region} · {site.address}
                      </p>
                      <p className="hrs">{site.hoursText}</p>
                      {site.note && <p className="note">{site.note}</p>}
                      <div className="dist">
                        <span className="dist-bar" aria-hidden>
                          <span style={{ width: `${(site.distanceKm / MAX_KM) * 100}%` }} />
                        </span>
                        <span>
                          <b>{site.distanceKm} km</b> od Rožnova
                        </span>
                      </div>
                      <div className="site-actions">
                        <a href={`tel:${site.phoneHref}`} className="btn btn-ink btn-sm">
                          Zavolat {site.phone}
                        </a>
                        <button
                          type="button"
                          className="maplink"
                          aria-pressed={isSel}
                          onClick={() => setSelectedId(site.id)}
                        >
                          {isSel ? "Zobrazeno na mapě" : "Ukázat na mapě"}
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="map-col">
              <MapEmbed
                title={selected.name}
                address={selected.address}
                src={embedUrl(selected.mapsQuery)}
                loaded={mapLoaded}
                onLoad={() => setMapLoaded(true)}
              />
              <a
                href={directionsUrl(selected.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="route"
              >
                Naplánovat trasu k {selected.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
