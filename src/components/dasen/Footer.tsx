import Image from "next/image";
import Link from "next/link";
import { clinic, openingHours } from "@/data/clinic";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand">
              <Image
                src="/images/logo-zub-transparent.png"
                alt=""
                width={32}
                height={38}
              />
              <span className="wordmark">
                <b>
                  Zub<span>U</span>m
                </b>
              </span>
            </Link>
            <p>
              {clinic.name}
              <br />
              {clinic.address.full}
            </p>
          </div>

          <div>
            <h4>Kontakt</h4>
            <ul>
              <li>
                <a href={`tel:${clinic.phoneHref}`}>{clinic.phone}</a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Ordinační doba</h4>
            <ul>
              {openingHours
                .filter((d) => d.hours)
                .map((d) => (
                  <li key={d.day}>
                    <span>{d.day}</span>
                    <span>{d.hours}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {year} {clinic.name}. Všechna práva vyhrazena.
          </span>
          <nav aria-label="Právní odkazy">
            <Link href="/ochrana-osobnich-udaju">Zásady ochrany osobních údajů</Link>
            <Link href="/admin">Administrace</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
