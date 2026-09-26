import Link from "next/link";
import { NewsForm } from "@/components/admin/NewsForm";

export default function NovaAktualitaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/admin"
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
        Zpět na přehled
      </Link>

      <h1 className="mt-6 mb-8 font-display-c text-3xl font-semibold text-ink">
        Nová aktualita
      </h1>

      <NewsForm mode="create" />
    </div>
  );
}
