# ZUBUM.CZ — web zubní ordinace

Web pro zubní ordinaci MDDr. Jitky Baslové. Postaveno na **Next.js 16 + TypeScript + Tailwind CSS v4 + Supabase**, nasazitelné zdarma na **Vercel**.

---

## Design

Aktuální vzhled se jmenuje **„Dáseň“** — hero je rozdělený jako logo (růžová korunka nahoře, tyrkysové kořeny dole) a zub z loga sedí přesně na rozhraní. Všechny komponenty jsou v `src/components/dasen/`, styly v `src/app/globals.css`. Obsah (údaje o ordinaci, ordinační doba, ceník, pohotovosti) se upravuje v `src/data/`. Mapy Google se načítají až po kliknutí návštěvníka.

## Co web umí

- Moderní, responzivní homepage (hero, aktuality, o ordinaci, ordinační hodiny, kontakt s mapou)
- Sekce **Aktuality** načítaná živě z databáze — doktorka je spravuje sama v `/admin`, bez zásahu do kódu
- Jednoduchá administrace s přihlášením přes magic link (e-mail), WYSIWYG editor, nahrávání obrázků
- SEO: sitemap.xml, robots.txt, Open Graph, JSON-LD strukturovaná data pro Google
- Stránka zásad ochrany osobních údajů

---

## 1. Jednorázové nastavení (děláte vy)

Potřebujete tři věci: účet na **Supabase** (databáze + přihlášení), účet na **GitHub** (už máte) a účet na **Vercel** (hosting). Vše má zdarma dostačující tarif.

### 1.1 Založení Supabase projektu

1. Jděte na supabase.com → **Start your project** → přihlaste se přes GitHub.
2. **New project** → zvolte název (např. `zubum`), region **Central EU (Frankfurt)**, nastavte databázové heslo.
3. Počkejte cca 2 minuty, než se projekt vytvoří.

### 1.2 Vytvoření databáze

1. V levém menu klikněte na **SQL Editor**.
2. Otevřete soubor `supabase/schema.sql` z tohoto projektu, zkopírujte celý obsah.
3. Vložte do SQL Editoru a klikněte **Run**.
4. Tím se vytvoří tabulka `news`, zabezpečení (RLS) a úložiště pro obrázky.

### 1.3 Zakázání veřejné registrace + pozvání doktorky

Aby se do administrace nemohl přihlásit kdokoliv jiný, kdo zná adresu `/admin`:

1. V Supabase: **Authentication → Sign In / Providers → Email**.
2. Vypněte přepínač "Allow new users to sign up".
3. Jděte na **Authentication → Users → Add user → Invite user**.
4. Zadejte e-mail doktorky (`baslove.zubum@gmail.com`) → **Send invitation**.

   Tím se v systému vytvoří uživatelský účet, na který bude fungovat přihlašovací magic link. Pozvánkový e-mail lze ignorovat — pro běžné přihlašování bude doktorka používat rovnou stránku `/admin/login` na webu.

### 1.4 Zkopírování API klíčů

1. V Supabase: **Project Settings (ozubené kolo) → API**.
2. Zkopírujte: **Project URL** a klíč **anon public**.
3. Tyto dvě hodnoty budete za chvíli vkládat do Vercelu (viz krok 2.3).

---

## 2. Nasazení na Vercel

### 2.1 Nahrání kódu na GitHub

```bash
cd zubum
git init
git add .
git commit -m "Initial commit — web ZUBUM.CZ"
git branch -M main
git remote add origin https://github.com/VASE-JMENO/zubum.git
git push -u origin main
```

(Repozitář si předem založte na github.com/new — stačí prázdný, bez README.)

### 2.2 Import do Vercelu

1. Jděte na vercel.com → přihlaste se přes GitHub.
2. **Add New → Project** → vyberte repozitář `zubum`.
3. Framework se detekuje automaticky jako **Next.js** — nic neměňte.

### 2.3 Vložení environment variables

Před kliknutím na **Deploy** rozbalte **Environment Variables** a přidejte:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | (Project URL ze Supabase) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (anon public klíč ze Supabase) |

Klikněte **Deploy**. Za cca minutu je web živý na dočasné adrese `zubum-xxxx.vercel.app`.

### 2.4 Připojení domény zubum.cz

1. Ve Vercelu: **Project → Settings → Domains → Add** → zadejte `zubum.cz` (a případně i `www.zubum.cz`).
2. Vercel zobrazí DNS záznamy, které je třeba nastavit u vašeho registrátora domény (Wedos, Active24 apod.):
   - Typicky **A záznam** pro `zubum.cz` → IP adresa, kterou Vercel zobrazí
   - **CNAME záznam** pro `www` → `cname.vercel-dns.com`
3. Nastavení DNS se projeví od pár minut do 24 hodin. Vercel automaticky vydá HTTPS certifikát.

**Web je nasazen.** Od teď každé `git push` do `main` větve automaticky nasadí novou verzi.

---

## 3. Jak bude doktorka přidávat aktuality

1. Otevře `https://zubum.cz/admin`.
2. Zadá svůj e-mail (`baslove.zubum@gmail.com`) → klikne **Poslat přihlašovací odkaz**.
3. V e-mailu klikne na odkaz → je přihlášená.
4. Klikne **+ Nová aktualita**, vyplní nadpis, datum a text, případně přidá obrázek.
5. Klikne **Publikovat** — aktualita se okamžitě objeví na webu (žádný deploy, žádné programování).
6. Kdykoliv může aktualitu upravit nebo smazat z přehledu v `/admin`.

Pokud potřebuje pouze rozepsat aktualitu a dopsat později, zvolí **Uložit jako koncept** — na webu se nezobrazí, dokud ji nepublikuje.

---

## 4. Lokální vývoj (pro vás, pokud budete chtít web dál upravovat)

```bash
npm install
cp .env.local.example .env.local   # a vyplňte Supabase údaje
npm run dev
```

Web poběží na `http://localhost:3000`.

---

## 5. Struktura projektu

```
src/
  app/
    page.tsx                  → homepage
    aktuality/                 → seznam a detail aktualit
    admin/                      → administrace (chráněno)
    ochrana-osobnich-udaju/    → GDPR stránka
    sitemap.ts, robots.ts      → SEO
  components/                  → veřejné komponenty (Hero, Header, Footer...)
  components/admin/            → komponenty administrace
  data/clinic.ts               → VŠECHNY ZÁKLADNÍ ÚDAJE (adresa, telefon, hodiny...)
  lib/supabase/                 → Supabase klienti
supabase/schema.sql            → databázové schéma ke spuštění v Supabase
```

### Změna kontaktních údajů, adresy nebo ordinační doby

Vše je na jednom místě: **`src/data/clinic.ts`**. Stačí upravit hodnoty a nahrát změnu (`git push`), Vercel automaticky nasadí novou verzi.

---

## 6. Bezpečnost — co je zajištěno

- Administrace `/admin` je chráněná middlewarem — bez přihlášení se na ni nedostanete.
- Databáze má zapnuté Row Level Security: veřejnost vidí jen publikované aktuality, zápis je povolen pouze přihlášeným uživatelům.
- Žádné API klíče nejsou v kódu — jsou jako environment variables ve Vercelu.
- `anon` klíč Supabase je bezpečné mít veřejně (je to standardní veřejný klíč chráněný RLS politikami) — nikdy ale nepoužívejte `service_role` klíč ve frontendu.
- Web neukládá žádná zdravotní data pacientů.

---

## 7. Provozní náklady

Při běžném provozu malé ordinace (řádově tisíce návštěv měsíčně):

- **Supabase Free tier**: 0 Kč — pokrývá databázi, přihlášení i úložiště obrázků
- **Vercel Hobby tier**: 0 Kč — hosting, HTTPS, automatické nasazení
- **Doména zubum.cz**: cca 200–300 Kč/rok (pokud ji ještě nemáte)

Pokud provoz výrazně vzroste, oba tarify lze kdykoliv upgradovat (řádově stovky Kč/měsíc).

---

## 8. Co dál (budoucí rozšíření, zatím neimplementováno)

Architektura je připravená na snadné doplnění:
- Fotogalerie ordinace
- Stránka Služby / Ceník
- Stránka Tým
- FAQ
- Více administrátorských účtů (stačí pozvat další e-mail v Supabase Auth)
