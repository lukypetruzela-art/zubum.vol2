"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/admin";

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMsg(
        error.message.includes("Invalid login credentials")
          ? "Nesprávný e-mail nebo heslo."
          : error.message
      );
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <Logo />

      <h1 className="mt-8 font-display-c text-2xl font-semibold text-ink">
        Přihlášení do administrace
      </h1>
      <p className="mt-2 text-center text-sm text-ink-soft">
        Zadejte svůj e-mail a heslo.
      </p>

      <form onSubmit={handleSignIn} className="mt-8 w-full space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="baslove.zubum@gmail.com"
            className="w-full rounded-xl border border-line px-4 py-3 text-ink outline-none transition-colors focus:border-crown-deep focus:ring-2 focus:ring-crown/40"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Heslo
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-line px-4 py-3 text-ink outline-none transition-colors focus:border-crown-deep focus:ring-2 focus:ring-crown/40"
          />
        </div>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Přihlašuji…" : "Přihlásit se"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
