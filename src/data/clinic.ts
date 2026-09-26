// Centrální místo pro základní údaje o ordinaci.
// Změny zde se projeví na celém webu (hlavička, patička, kontakt, SEO, strukturovaná data).

export const clinic = {
  name: "Zubní ordinace MDDr. Jitky Baslové",
  shortName: "ZUBUM",
  domain: "zubum.cz",
  siteUrl: "https://www.zubum.cz",
  doctor: "MDDr. Jitka Baslová",
  assistant: "Mgr. Jitka Baslová, DiS.", // shoda jména se zubařkou potvrzena — jde o dvě odlišné osoby
  ic: "231 96 998",
  icz: "94 819 000",
  email: "baslove.zubum@gmail.com",
  phone: "+420 606 055 078",
  phoneHref: "+420606055078",
  address: {
    street: "Letenská 1183",
    city: "Rožnov pod Radhoštěm",
    zip: "756 61",
    full: "Letenská 1183, 756 61 Rožnov pod Radhoštěm",
  },
  mapsQuery: "Letenská 1183, 756 61 Rožnov pod Radhoštěm",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Leten%C3%A1%20zub%C5%BE+1183%20Ro%C5%BEnov+pod+Radho%C5%A1t%C4%9Bm&output=embed",
} as const;

export type OpeningHourRow = {
  day: string;
  hours: string | null; // null = zavřeno
};

export const openingHours: OpeningHourRow[] = [
  { day: "Pondělí", hours: "7:30 – 17:00" },
  { day: "Úterý", hours: "13:00 – 18:00" },
  { day: "Středa", hours: "7:30 – 15:30" },
  { day: "Čtvrtek", hours: "7:30 – 15:30" },
  { day: "Pátek", hours: null },
  { day: "Sobota", hours: null },
  { day: "Neděle", hours: null },
];

// Pro schema.org strukturovaná data (formát HH:MM–HH:MM, dny v angličtině)
export const openingHoursSpecification = [
  { dayOfWeek: "Monday", opens: "07:30", closes: "17:00" },
  { dayOfWeek: "Tuesday", opens: "13:00", closes: "18:00" },
  { dayOfWeek: "Wednesday", opens: "07:30", closes: "15:30" },
  { dayOfWeek: "Thursday", opens: "07:30", closes: "15:30" },
];
