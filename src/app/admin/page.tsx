import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatCzechDate } from "@/lib/format";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { DeleteNewsButton } from "@/components/admin/DeleteNewsButton";
import type { NewsItem } from "@/types/news";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });

  const items = (news ?? []) as NewsItem[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-soft">Přihlášena jako {user?.email}</p>
          <h1 className="font-display-c text-3xl font-semibold text-ink">
            Aktuality
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/nova"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            + Nová aktualita
          </Link>
          <SignOutButton />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-paper px-8 py-16 text-center">
          <p className="font-medium text-ink">Zatím žádné aktuality.</p>
          <p className="mt-1 text-sm text-ink-soft">
            Vytvořte první kliknutím na „+ Nová aktualita“ výše.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 ${
                i !== items.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ink-soft">
                    {formatCzechDate(item.date)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide ${
                      item.status === "published"
                        ? "bg-root text-ink"
                        : "bg-paper text-ink-soft"
                    }`}
                  >
                    {item.status === "published" ? "Publikováno" : "Koncept"}
                  </span>
                </div>
                <p className="mt-1 font-medium text-ink">{item.title}</p>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/${item.id}`}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper"
                >
                  Upravit
                </Link>
                <DeleteNewsButton id={item.id} title={item.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
