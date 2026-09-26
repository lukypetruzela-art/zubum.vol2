"use client";

import { Brand } from "@/components/dasen/Brand";

// Logo s textem (používá se např. na přihlašovací stránce administrace).
export function Logo({ withText = true }: { withText?: boolean; compact?: boolean }) {
  return <Brand withSubtitle={withText} />;
}
