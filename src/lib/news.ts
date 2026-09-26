import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/types/news";

/**
 * Načte publikované aktuality (nejnovější první).
 * Pokud Supabase není nakonfigurováno nebo dojde k chybě, vrátí prázdné pole
 * místo pádu stránky — web tak funguje i před připojením databáze.
 */
export async function getPublishedNews(limit?: number): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Chyba při načítání aktualit:", error.message);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Supabase není dostupné:", err);
    return [];
  }
}

export async function getPublishedNewsBySlug(
  slug: string
): Promise<NewsItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("Chyba při načítání aktuality:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Supabase není dostupné:", err);
    return null;
  }
}
