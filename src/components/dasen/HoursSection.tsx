import { HoursWeek } from "./HoursWeek";
import { SectionName } from "./SectionName";

export function HoursSection() {
  return (
    <section id="hodiny" className="sec sec-tight">
      <div className="wrap sec-grid">
        <SectionName>Ordinační doba</SectionName>
        <div>
          <h2 className="display">Kdy ordinujeme</h2>
          <p className="intro">
            Objednáváme se na konkrétní čas – zavolejte nebo napište e-mail a
            domluvíme si termín, který vám bude vyhovovat.
          </p>
        </div>
        <div className="sec-body">
          <HoursWeek />
        </div>
      </div>
    </section>
  );
}
