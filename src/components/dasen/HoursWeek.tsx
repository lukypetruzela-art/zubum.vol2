"use client";

import { useEffect, useState } from "react";
import { formatClock, minutesNow, mondayFirst, weekWindows } from "@/lib/hours";

// Týdenní osa 7:00–19:00. Dnešek a čára "teď" se dopočítají v prohlížeči.
const SCALE_START = 7 * 60;
const SCALE_END = 19 * 60;
const RANGE = SCALE_END - SCALE_START;
const TICKS = [7, 9, 11, 13, 15, 17, 19];

const pct = (min: number) => ((min - SCALE_START) / RANGE) * 100;

export function HoursWeek() {
  const [now, setNow] = useState<{ dow: number; min: number } | null>(null);

  useEffect(() => {
    const sync = () => {
      const d = new Date();
      setNow({ dow: mondayFirst(d), min: minutesNow(d) });
    };
    sync();
    const t = setInterval(sync, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="week">
      <div className="week-scale" aria-hidden>
        <span />
        <div className="ticks">
          {TICKS.map((h) => (
            <span key={h} style={{ left: `${pct(h * 60)}%` }}>
              {h}:00
            </span>
          ))}
        </div>
        <span />
      </div>

      <ul className="days">
        {weekWindows.map((row, i) => {
          const isToday = now?.dow === i;
          const open = row.start !== null && row.end !== null;
          const showNow =
            isToday && now !== null && now.min >= SCALE_START && now.min <= SCALE_END;
          return (
            <li
              key={row.day}
              className={`day${open ? "" : " closed"}${isToday ? " today" : ""}`}
            >
              <span className="day-name">
                {row.day}
                {isToday && <span className="today-tag">dnes</span>}
              </span>
              <span className="track" aria-hidden>
                {open && (
                  <span
                    className="bar"
                    style={{
                      left: `${pct(row.start!)}%`,
                      width: `${((row.end! - row.start!) / RANGE) * 100}%`,
                    }}
                  />
                )}
                {showNow && (
                  <span
                    className="now"
                    data-t={`teď ${formatClock(now!.min)}`}
                    style={{ left: `${pct(now!.min)}%` }}
                  />
                )}
              </span>
              <span className="day-hrs">{row.hours ?? "Zavřeno"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
