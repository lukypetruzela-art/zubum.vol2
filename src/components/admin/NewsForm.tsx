"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { createNews, updateNews, type ActionResult } from "@/app/admin/actions";
import { RichTextEditor } from "./RichTextEditor";
import type { NewsItem } from "@/types/news";

type Props = {
  mode: "create" | "edit";
  item?: NewsItem;
};

const initialState: ActionResult | null = null;

export function NewsForm({ mode, item }: Props) {
  const action =
    mode === "create" ? createNews : updateNews.bind(null, item!.id);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [removeImage, setRemoveImage] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">(
    item?.status ?? "draft"
  );

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
          Nadpis
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={item?.title}
          placeholder="Např. Dovolená 15.–19. 8."
          className="w-full rounded-xl border border-line px-4 py-3 text-ink outline-none focus:border-crown-deep focus:ring-2 focus:ring-crown/40"
        />
      </div>

      <div>
        <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ink">
          Datum
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={item?.date ?? today}
          className="w-full rounded-xl border border-line px-4 py-3 text-ink outline-none focus:border-crown-deep focus:ring-2 focus:ring-crown/40 sm:w-64"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink">Text</span>
        <RichTextEditor name="content" defaultValue={item?.content} />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink">
          Obrázek (nepovinné)
        </span>

        {item?.image_url && !removeImage && (
          <div className="mb-3 flex items-center gap-4">
            <div className="relative h-20 w-28 overflow-hidden rounded-lg bg-root/30">
              <Image
                src={item.image_url}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setRemoveImage(true)}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Odebrat obrázek
            </button>
          </div>
        )}

        <input type="hidden" name="remove_image" value={String(removeImage)} />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="block w-full text-sm text-ink-soft file:mr-4 file:rounded-full file:border-0 file:bg-crown file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink hover:file:bg-crown-deep"
        />
      </div>

      {state && "error" in state && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          name="status"
          value="draft"
          onClick={() => setStatus("draft")}
          disabled={isPending}
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:opacity-50"
        >
          Uložit jako koncept
        </button>
        <button
          type="submit"
          name="status"
          value="published"
          onClick={() => setStatus("published")}
          disabled={isPending}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending
            ? "Ukládám…"
            : status === "published" || item?.status === "published"
            ? "Uložit a publikovat"
            : "Publikovat"}
        </button>
      </div>
    </form>
  );
}
