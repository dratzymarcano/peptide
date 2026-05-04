-- Supabase migration: contact_messages table + tighten RLS posture
-- Apply via `supabase db push` or `psql -f` on a Postgres-backed Supabase project.
--
-- Goals:
--   1. Persist contact-form submissions from /api/contact.
--   2. Lock down public reads on `orders`, `order_items` and `contact_messages` —
--      service-role inserts (used by API routes) bypass RLS, so deny-all on
--      anon/authenticated reads is safe and recommended.
--   3. Make the orders policies idempotent (re-runnable).

-- contact_messages -----------------------------------------------------------

create table if not exists public.contact_messages (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  topic       text null,
  message     text not null,
  locale      text not null default 'en',
  source      text not null default 'contact-form',
  ip_hash     text null,
  user_agent  text null,
  metadata    jsonb null
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_email_idx
  on public.contact_messages (email);

alter table public.contact_messages enable row level security;

-- contact_messages: deny all anon/authenticated reads. Only the service role
-- (used by the /api/contact endpoint) can insert; service role bypasses RLS,
-- so no insert policy is needed.
drop policy if exists "contact_messages_no_public_read" on public.contact_messages;
create policy "contact_messages_no_public_read" on public.contact_messages
  for select using (false);

drop policy if exists "contact_messages_no_anon_write" on public.contact_messages;
create policy "contact_messages_no_anon_write" on public.contact_messages
  for insert with check (false);

-- orders / order_items: deny public reads and explicitly forbid writes via the
-- anon key. Service-role inserts continue to bypass RLS.

drop policy if exists "orders_no_public_read" on public.orders;
create policy "orders_no_public_read" on public.orders
  for select using (false);

drop policy if exists "orders_no_anon_write" on public.orders;
create policy "orders_no_anon_write" on public.orders
  for insert with check (false);

drop policy if exists "orders_no_anon_update" on public.orders;
create policy "orders_no_anon_update" on public.orders
  for update using (false);

drop policy if exists "orders_no_anon_delete" on public.orders;
create policy "orders_no_anon_delete" on public.orders
  for delete using (false);

drop policy if exists "order_items_no_public_read" on public.order_items;
create policy "order_items_no_public_read" on public.order_items
  for select using (false);

drop policy if exists "order_items_no_anon_write" on public.order_items;
create policy "order_items_no_anon_write" on public.order_items
  for insert with check (false);

drop policy if exists "order_items_no_anon_update" on public.order_items;
create policy "order_items_no_anon_update" on public.order_items
  for update using (false);

drop policy if exists "order_items_no_anon_delete" on public.order_items;
create policy "order_items_no_anon_delete" on public.order_items
  for delete using (false);

-- Revoke any default grants from anon/authenticated so RLS is the only gate.
revoke all on table public.contact_messages from anon, authenticated;
revoke all on table public.orders            from anon, authenticated;
revoke all on table public.order_items       from anon, authenticated;
