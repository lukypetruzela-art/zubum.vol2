-- ============================================================
-- ZUBUM.CZ — databázové schéma pro Supabase
-- Spusťte celý tento skript v Supabase Dashboard → SQL Editor.
-- ============================================================

-- Rozšíření pro generování UUID (na Supabase bývá už zapnuté, ale pro jistotu)
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabulka aktualit
-- ------------------------------------------------------------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  date date not null default current_date,
  content text not null default '',
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_status_date_idx on public.news (status, date desc);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.news enable row level security;

-- Veřejnost (nepřihlášení návštěvníci webu) vidí jen publikované aktuality
drop policy if exists "Public can read published news" on public.news;
create policy "Public can read published news"
  on public.news for select
  to anon
  using (status = 'published');

-- Přihlášení uživatelé (doktorka) vidí úplně vše, včetně konceptů
drop policy if exists "Authenticated can read all news" on public.news;
create policy "Authenticated can read all news"
  on public.news for select
  to authenticated
  using (true);

-- Přihlášení uživatelé mohou vytvářet, upravovat a mazat aktuality
drop policy if exists "Authenticated can insert news" on public.news;
create policy "Authenticated can insert news"
  on public.news for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update news" on public.news;
create policy "Authenticated can update news"
  on public.news for update
  to authenticated
  using (true);

drop policy if exists "Authenticated can delete news" on public.news;
create policy "Authenticated can delete news"
  on public.news for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- Storage bucket pro obrázky u aktualit
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view news images" on storage.objects;
create policy "Public can view news images"
  on storage.objects for select
  to public
  using (bucket_id = 'news-images');

drop policy if exists "Authenticated can upload news images" on storage.objects;
create policy "Authenticated can upload news images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news-images');

drop policy if exists "Authenticated can delete news images" on storage.objects;
create policy "Authenticated can delete news images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'news-images');

-- ============================================================
-- Hotovo. Dál pokračujte podle README.md, sekce "Nastavení Supabase":
-- 1. Auth → Providers → Email: vypněte "Allow new users to sign up"
--    (aby se nemohl zaregistrovat nikdo jiný než pozvaná doktorka).
-- 2. Auth → Users → Invite user → zadejte e-mail doktorky.
-- ============================================================
