"use client";

import { signOut } from "@/app/admin/actions";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper"
    >
      Odhlásit se
    </button>
  );
}
