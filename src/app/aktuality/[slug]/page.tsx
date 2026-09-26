import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedNewsBySlug } from "@/lib/news";
import { formatCzechDate } from "@/lib/format";
import { sanitizeRichText } from "@/lib/sanitize";

export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedNewsBySlug(slug);

  if (!item) {
    return { title: "Aktualita nenalezena" };
  }

  return {
    title: item.title,
    description: item.content.replace(/<[^>]+>/g, "").slice(0, 155),
  };
}

export default async function AktualitaDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPublishedNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link
        href="/aktuality"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Zpět na aktuality
      </Link>

      <span className="mt-8 block text-[15px] font-medium text-ink-soft">
        {formatCzechDate(item.date)}
      </span>
      <h1 className="mt-2 font-display-c text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        {item.title}
      </h1>

      {item.image_url && (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[28px] border-2 border-ink bg-root/30">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg mt-8 max-w-none text-ink-soft prose-headings:font-display-c prose-headings:font-semibold prose-headings:text-ink prose-a:text-ink prose-a:decoration-crown-deep prose-a:decoration-2"
        dangerouslySetInnerHTML={{ __html: sanitizeRichText(item.content) }}
      />
    </article>
  );
}
