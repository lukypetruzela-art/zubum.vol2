import Image from "next/image";
import { clinic } from "@/data/clinic";
import { TodayHours } from "./TodayHours";

// Hero „Dáseň": růžová korunka nahoře, tyrkysové kořeny dole
// a zub z loga posazený přesně na rozhraní obou ploch.
export function Hero() {
  return (
    <section className="hero" aria-label="Úvod">
      <div className="hero-crown">
        <div className="wrap">
          <div className="hero-copy">
            <p className="place">{clinic.address.city}</p>
            <h1 className="display">
              Péče o úsměv,
              <br />
              která má styl.
            </h1>
            <p className="lead">
              Zubní ordinace {clinic.doctor}. Šetrné ošetření, dostatek času a
              klidné prostředí pro celou rodinu.
            </p>
            <div className="actions">
              <a href="#kontakt" className="btn btn-ink">
                Objednat se
              </a>
              <a href={`tel:${clinic.phoneHref}`} className="btn btn-line">
                {clinic.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-root">
        <div className="wrap">
          <div className="facts">
            <div className="fact">
              <span className="k">Adresa ordinace</span>
              <p className="v">
                {clinic.address.street}
                <br />
                {clinic.address.zip} {clinic.address.city}
              </p>
            </div>
            <TodayHours />
          </div>
          <Image
            src="/images/logo-zub-transparent.png"
            alt=""
            width={700}
            height={830}
            priority
            sizes="(max-width: 720px) 132px, 31vw"
            className="tooth"
          />
        </div>
      </div>
    </section>
  );
}
