import { clinic } from "@/data/clinic";
import { SectionName } from "./SectionName";

export function About() {
  return (
    <section id="o-ordinaci" className="sec">
      <div className="wrap sec-grid">
        <SectionName>O ordinaci</SectionName>
        <h2 className="display">
          Prostor, kde se obavy ze zubního ošetření rozplývají
        </h2>
        <div className="sec-body about">
          <div>
            <p>
              Naše ordinace v Rožnově pod Radhoštěm poskytuje komplexní zubní
              péči pro dospělé i děti. Klademe důraz na klidný a vstřícný
              přístup, dostatek času na každého pacienta a moderní, šetrné
              metody ošetření.
            </p>
            <p>
              Ať už přicházíte na preventivní prohlídku, nebo řešíte akutní
              problém, uděláme vše pro to, abyste od nás odcházeli s úsměvem.
            </p>
          </div>
          <div>
            <ul className="team">
              <li>
                <span className="dot crown" aria-hidden />
                <div>
                  <strong>{clinic.doctor}</strong>
                  <span>Zubní lékařka</span>
                </div>
              </li>
              <li>
                <span className="dot root" aria-hidden />
                <div>
                  <strong>{clinic.assistant}</strong>
                  <span>Zubní asistentka</span>
                </div>
              </li>
            </ul>
            <div className="motto">
              <strong>Individuální péče</strong>
              <span>Svědomitost, odbornost, partnerský přístup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
