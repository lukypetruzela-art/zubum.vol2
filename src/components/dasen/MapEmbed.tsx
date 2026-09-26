"use client";

import { useState } from "react";

type Props = {
  title: string;
  address: string;
  src: string;
  /** Řízený režim (pohotovosti): mapa zůstane načtená i po přepnutí místa. */
  loaded?: boolean;
  onLoad?: () => void;
};

// Google mapa se načte až po kliknutí. Box má pevný poměr stran,
// takže stránka při načtení mapy neposkočí (a Google se nenačte bez akce návštěvníka).
export function MapEmbed({ title, address, src, loaded, onLoad }: Props) {
  const [ownLoaded, setOwnLoaded] = useState(false);
  const isLoaded = loaded ?? ownLoaded;

  return (
    <div className="mapbox">
      {isLoaded ? (
        <iframe
          key={src}
          title={`Mapa — ${title}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-ph">
          <span className="pin" aria-hidden />
          <div>
            <strong>{title}</strong>
            <p>{address}</p>
          </div>
          <button
            type="button"
            className="btn btn-ink btn-sm"
            style={{ alignSelf: "flex-start" }}
            onClick={() => (onLoad ? onLoad() : setOwnLoaded(true))}
          >
            Zobrazit mapu
          </button>
        </div>
      )}
    </div>
  );
}
