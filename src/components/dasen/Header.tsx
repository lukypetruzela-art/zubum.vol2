"use client";

import { useState } from "react";
import { clinic } from "@/data/clinic";
import { Brand } from "./Brand";

const navLinks = [
  { href: "/#o-ordinaci", label: "O ordinaci" },
  { href: "/#aktuality", label: "Aktuality" },
  { href: "/#hodiny", label: "Ordinační doba" },
  { href: "/#cenik", label: "Ceník" },
  { href: "/#pohotovost", label: "Pohotovost" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="wrap">
        <Brand />

        <nav
          id="hlavni-navigace"
          className={`nav${open ? " open" : ""}`}
          aria-label="Hlavní navigace"
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${clinic.phoneHref}`} className="btn btn-ink btn-sm">
            Objednat se
          </a>
        </nav>

        <button
          type="button"
          className="btn btn-line btn-sm menu-btn"
          aria-expanded={open}
          aria-controls="hlavni-navigace"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Zavřít" : "Menu"}
        </button>
      </div>
    </header>
  );
}
