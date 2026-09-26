"use client";

import { useEffect, useState } from "react";
import { DAY_ACCUSATIVE, minutesNow, mondayFirst, weekWindows } from "@/lib/hours";

// "Dnes ordinujeme 7:30 – 17:00" / "Dnes je zavřeno – Znovu v pondělí od 7:30".
// Počítá se až v prohlížeči (podle času návštěvníka), aby nevznikl nesoulad se serverem.
export function TodayHours() {
  const [state, setState] = useState<{ label: string; value: string } | null>(null);

  useEffect(() => {
    const sync = () => {
      const now = new Date();
      const dow = mondayFirst(now);
      const min = minutesNow(now);
      const today = weekWindows[dow];

      if (today.hours && today.end !== null) {
        setState({
          label: min >= today.end ? "Dnes jsme ordinovali" : "Dnes ordinujeme",
          value: today.hours,
        });
        return;
      }
      for (let i = 1; i < 8; i++) {
        const idx = (dow + i) % 7;
        const d = weekWindows[idx];
        if (d.hours) {
          setState({
            label: "Dnes je zavřeno",
            value: `Znovu v ${DAY_ACCUSATIVE[idx]} od ${d.hours.split(/[–-]/)[0].trim()}`,
          });
          return;
        }
      }
    };
    sync();
    const t = setInterval(sync, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fact">
      <span className="k">{state?.label ?? "Ordinační doba"}</span>
      <p className="v">{state?.value ?? "\u00a0"}</p>
    </div>
  );
}
