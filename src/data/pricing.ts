// Ceník výkonů. Sdílené mezi oběma variantami designu.
// Aktualizováno podle podkladu od kliniky.

export type PriceItem = {
  name: string;
  price: number;
  from?: boolean; // true = cena "od" (orientační)
};

export const priceList: PriceItem[] = [
  { name: "Fluoridace", price: 300 },
  { name: "Remineralizace", price: 200 },
  { name: "Konzultace", price: 600 },
  { name: "Fotokompozitní výplň", price: 1650, from: true },
  { name: "Kompletní dostavba zubu", price: 5000 },
  { name: "Provizorní ošetření kanálků", price: 1650 },
  { name: "Dlouhodobé ošetření kanálků", price: 3300, from: true },
  { name: "Celokeramická korunka zirkoniová", price: 7500 },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString("cs-CZ")} Kč`;
}
