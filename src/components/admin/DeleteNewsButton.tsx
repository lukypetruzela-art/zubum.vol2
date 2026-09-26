"use client";

import { useTransition } from "react";
import { deleteNews } from "@/app/admin/actions";

export function DeleteNewsButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !confirm(`Opravdu chcete smazat aktualitu „${title}“? Tuto akci nelze vrátit zpět.`)
    ) {
      return;
    }
    startTransition(() => deleteNews(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? "Mažu…" : "Smazat"}
    </button>
  );
}
