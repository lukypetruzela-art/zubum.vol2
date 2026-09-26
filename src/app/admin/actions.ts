"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";

export type ActionResult = { error: string } | { success: true };

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return { supabase, user };
}

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData
): Promise<string | null> {
  const file = formData.get("image") as File | null;

  if (!file || file.size === 0) {
    return null;
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("news-images")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Nahrání obrázku selhalo: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("news-images").getPublicUrl(path);

  return publicUrl;
}

export async function createNews(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireUser();

  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const content = String(formData.get("content") ?? "");
  const status = formData.get("status") === "published" ? "published" : "draft";

  if (!title) return { error: "Vyplňte prosím nadpis aktuality." };
  if (!date) return { error: "Vyplňte prosím datum." };

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadImageIfPresent(supabase, formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Chyba nahrávání." };
  }

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let attempt = 1;

  // Zajistit unikátní slug
  while (true) {
    const { data: existing } = await supabase
      .from("news")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }

  const { error } = await supabase.from("news").insert({
    title,
    slug,
    date,
    content,
    image_url: imageUrl,
    status,
  });

  if (error) {
    return { error: `Uložení se nezdařilo: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/aktuality");
  redirect("/admin");
}

export async function updateNews(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireUser();

  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const content = String(formData.get("content") ?? "");
  const status = formData.get("status") === "published" ? "published" : "draft";
  const removeImage = formData.get("remove_image") === "true";

  if (!title) return { error: "Vyplňte prosím nadpis aktuality." };
  if (!date) return { error: "Vyplňte prosím datum." };

  const updates: Record<string, unknown> = {
    title,
    date,
    content,
    status,
    updated_at: new Date().toISOString(),
  };

  try {
    const uploaded = await uploadImageIfPresent(supabase, formData);
    if (uploaded) {
      updates.image_url = uploaded;
    } else if (removeImage) {
      updates.image_url = null;
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Chyba nahrávání." };
  }

  const { error } = await supabase.from("news").update(updates).eq("id", id);

  if (error) {
    return { error: `Uložení se nezdařilo: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/aktuality");
  redirect("/admin");
}

export async function deleteNews(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/aktuality");
  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
