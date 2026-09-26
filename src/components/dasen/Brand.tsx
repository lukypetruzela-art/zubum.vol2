"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Brand({ withSubtitle = true }: { withSubtitle?: boolean }) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Na hlavní stránce klik na logo jen plynule vyjede nahoru.
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="brand"
      aria-label="Zubní ordinace MDDr. Jitky Baslové — hlavní stránka"
    >
      <Image
        src="/images/logo-zub-transparent.png"
        alt="ZubUm logo"
        width={36}
        height={43}
        priority
      />
      <span className="wordmark">
        <b>
          Zub<span>U</span>m
        </b>
        {withSubtitle && <small>MDDr. Jitka Baslová</small>}
      </span>
    </Link>
  );
}
