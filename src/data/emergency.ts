// Data pro sekci "Zubní pohotovost" — přehled nejbližších stomatologických
// pohotovostí v dojezdu od ordinace v Rožnově pod Radhoštěm.
// V Rožnově samotném zubní pohotovost není, proto odkazujeme na okolní kraje.
//
// POZOR: ordinační doby pohotovostí se čas od času mění (zejména u krajských
// nemocnic, kde se lékaři střídají dle rozpisu) — doporučujeme čas od času
// telefonicky ověřit u zdrojů níže.

export type EmergencyWindow = { start: number; end: number } | null; // minuty od půlnoci

export type EmergencySite = {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  phoneHref: string;
  mapsQuery: string;
  distanceKm: number; // vzdušnou čarou od Rožnova pod Radhoštěm
  hoursText: string;
  note?: string;
  // pořadí: Po, Út, St, Čt, Pá, So, Ne
  schedule: EmergencyWindow[];
};

export const emergencySites: EmergencySite[] = [
  {
    id: "vsetin",
    name: "Vsetínská nemocnice a.s.",
    region: "okres Vsetín",
    address: "Nemocniční 955, 755 01 Vsetín",
    phone: "571 818 581",
    phoneHref: "+420571818581",
    mapsQuery: "Vsetínská nemocnice, Nemocniční 955, Vsetín",
    distanceKm: 17,
    hoursText: "So, Ne, svátky 8:00–12:00",
    schedule: [null, null, null, null, null, { start: 480, end: 720 }, { start: 480, end: 720 }],
  },
  {
    id: "ostrava",
    name: "Dental Emergency (Ajna Dental)",
    region: "Ostrava-Vítkovice, areál Ridera Sport",
    address: "Závodní 2885/86, 703 00 Ostrava-Vítkovice",
    phone: "771 153 858",
    phoneHref: "+420771153858",
    mapsQuery: "Dental Emergency, Závodní 2885/86, Ostrava-Vítkovice",
    distanceKm: 39,
    hoursText: "Po–Pá 18:00–23:00 · So, Ne, svátky 7:00–22:00",
    schedule: [
      { start: 1080, end: 1380 },
      { start: 1080, end: 1380 },
      { start: 1080, end: 1380 },
      { start: 1080, end: 1380 },
      { start: 1080, end: 1380 },
      { start: 420, end: 1320 },
      { start: 420, end: 1320 },
    ],
  },
  {
    id: "zlin",
    name: "Krajská nemocnice T. Bati",
    region: "okres Zlín · 21. pavilon",
    address: "Havlíčkovo nábřeží 600, 762 75 Zlín",
    phone: "577 552 848",
    phoneHref: "+420577552848",
    mapsQuery: "Krajská nemocnice T. Bati, Havlíčkovo nábřeží 600, Zlín",
    distanceKm: 43,
    hoursText: "So, Ne, svátky 8:00–13:00",
    schedule: [null, null, null, null, null, { start: 480, end: 780 }, { start: 480, end: 780 }],
  },
  {
    id: "kromeriz",
    name: "Kroměřížská nemocnice a.s.",
    region: "okres Kroměříž",
    address: "Havlíčkova 660/69, 767 01 Kroměříž",
    phone: "573 322 208",
    phoneHref: "+420573322208",
    mapsQuery: "Kroměřížská nemocnice, Havlíčkova 660, Kroměříž",
    distanceKm: 57,
    hoursText: "So, Ne, svátky 8:00–12:00",
    schedule: [null, null, null, null, null, { start: 480, end: 720 }, { start: 480, end: 720 }],
  },
  {
    id: "olomouc",
    name: "Fakultní nemocnice Olomouc",
    region: "Klinika ústní, čelistní a obličejové chirurgie",
    address: "Zdravotníků 248/7, 779 00 Olomouc",
    phone: "588 441 111",
    phoneHref: "+420588441111",
    mapsQuery: "Fakultní nemocnice Olomouc, Zdravotníků 248/7",
    distanceKm: 65,
    hoursText: "So, Ne, svátky 8:00–16:00",
    note: "Akutní život ohrožující nebo krvácivé stavy ošetří kdykoliv.",
    schedule: [null, null, null, null, null, { start: 480, end: 960 }, { start: 480, end: 960 }],
  },
];
