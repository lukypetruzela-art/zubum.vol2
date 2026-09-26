import type { Metadata } from "next";
import { getPublishedNews } from "@/lib/news";
import { NewsList } from "@/components/dasen/NewsList";
import { SectionName } from "@/components/dasen/SectionName";

export const metadata: Metadata = {
  title: "Aktuality",
  description:
    "Aktuální informace z provozu zubní ordinace ZUBUM.CZ — dovolené, změny ordinační doby a další novinky.",
};

export const revalidate = 0;

export default async function AktualityPage() {
  const news = await getPublishedNews();

  return (
    <section className="sec">
      <div className="wrap sec-grid">
        <SectionName>Aktuality</SectionName>
        <h1 className="display">Novinky z ordinace</h1>
        <div className="sec-body">
          <NewsList items={news} />
        </div>
      </div>
    </section>
  );
}
