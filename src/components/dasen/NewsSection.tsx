import Link from "next/link";
import { getPublishedNews } from "@/lib/news";
import { NewsList } from "./NewsList";
import { SectionName } from "./SectionName";

export async function NewsSection() {
  const news = await getPublishedNews(3);

  return (
    <section id="aktuality" className="sec sec-tight">
      <div className="wrap sec-grid">
        <SectionName>Co je nového</SectionName>
        <div className="news-top">
          <h2 className="display">Aktuality z ordinace</h2>
          {news.length > 0 && (
            <Link href="/aktuality" className="btn btn-line btn-sm">
              Všechny aktuality
            </Link>
          )}
        </div>
        <div className="sec-body">
          <NewsList items={news} />
        </div>
      </div>
    </section>
  );
}
