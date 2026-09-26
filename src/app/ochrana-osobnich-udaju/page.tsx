import type { Metadata } from "next";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description: "Informace o zpracování osobních údajů návštěvníků webu.",
};

export default function GdprPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display-c text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        Zásady ochrany osobních údajů
      </h1>

      <div className="prose prose-lg mt-8 max-w-none text-ink-soft prose-headings:font-display-c prose-headings:font-semibold prose-headings:text-ink">
        <p>
          Provozovatelem webových stránek {clinic.domain} je {clinic.name},
          IČ: {clinic.ic}.
        </p>

        <h3>Jaké údaje zpracováváme</h3>
        <p>
          Tento web neobsahuje žádný formulář ani rezervační systém, a proto
          aktivně nesbíráme osobní údaje návštěvníků. Kontaktní údaje
          (telefon, e-mail), které nám sami poskytnete při objednání na
          vyšetření, zpracováváme výhradně za účelem poskytnutí zdravotní
          péče.
        </p>

        <h3>Cookies</h3>
        <p>
          Web může používat technické cookies nezbytné pro jeho základní
          fungování. Nepoužíváme marketingové ani analytické cookies třetích
          stran nad rámec běžných služeb (např. zobrazení mapy).
        </p>

        <h3>Vaše práva</h3>
        <p>
          V souvislosti se zpracováním osobních údajů máte právo na přístup k
          údajům, jejich opravu či výmaz. V případě dotazů nás kontaktujte na
          e-mailu{" "}
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>.
        </p>
      </div>
    </div>
  );
}
