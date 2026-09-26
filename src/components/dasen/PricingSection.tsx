import { priceList, formatPrice } from "@/data/pricing";
import { SectionName } from "./SectionName";

export function PricingSection() {
  return (
    <section id="cenik" className="sec sec-tight">
      <div className="wrap sec-grid">
        <SectionName>Ceník</SectionName>
        <div>
          <h2 className="display">Kolik co stojí</h2>
          <p className="intro">
            Přehled orientačních cen nejčastějších výkonů. Přesnou cenu vždy
            stanovíme až po vyšetření, podle rozsahu ošetření.
          </p>
        </div>
        <div className="sec-body">
          <ul className="prices">
            {priceList.map((item) => (
              <li key={item.name}>
                <span className="name">{item.name}</span>
                <span className="dots" aria-hidden />
                <span className="price">
                  {item.from && <span className="from">od</span>}
                  {formatPrice(item.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
