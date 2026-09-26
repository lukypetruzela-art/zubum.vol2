import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/types/news";
import { formatCzechDate } from "@/lib/format";

// Seznam aktualit — používá se na hlavní stránce i na /aktuality.
export function NewsList({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return (
      <div className="news">
        <div className="news-empty">
          <strong>Momentálně nejsou žádné nové zprávy.</strong>
          <p>
            Sledujte tuto sekci — objeví se zde důležité informace o provozu
            ordinace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="news">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/aktuality/${item.slug}`}
            className={`news-row${item.image_url ? " has-img" : ""}`}
          >
            <time dateTime={item.date}>{formatCzechDate(item.date)}</time>
            <h3>{item.title}</h3>
            {item.image_url && (
              <span className="news-thumb">
                <Image
                  src={item.image_url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover"
                />
              </span>
            )}
            <span className="more">Číst více</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
