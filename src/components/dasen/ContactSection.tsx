import { clinic } from "@/data/clinic";
import { MapEmbed } from "./MapEmbed";
import { SectionName } from "./SectionName";

export function ContactSection() {
  return (
    <section id="kontakt" className="sec contact">
      <div className="wrap sec-grid">
        <SectionName>Kontakt</SectionName>
        <div>
          <h2 className="display">Objednejte se</h2>
          <p className="intro">
            Nejrychleji se domluvíte telefonicky. Napsat nám můžete samozřejmě
            i e-mailem.
          </p>
        </div>
        <div className="sec-body">
          <a href={`tel:${clinic.phoneHref}`} className="phone-big">
            {clinic.phone}
          </a>
          <br />
          <a href={`mailto:${clinic.email}`} className="mail">
            {clinic.email}
          </a>

          <div className="contact-grid">
            <div className="addr-card">
              <div>
                <span className="k">Adresa</span>
                <p className="v">{clinic.address.full}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  clinic.mapsQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line"
              >
                Trasa
              </a>
            </div>
            <MapEmbed
              title="Zubní ordinace ZubUm"
              address={clinic.address.full}
              src={clinic.mapsEmbedSrc}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
