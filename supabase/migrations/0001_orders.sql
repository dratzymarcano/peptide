-- Supabase migration: orders + order_items
-- Apply via `supabase db push` or `psql -f` on a Postgres-backed Supabase project.

create table if not exists public.orders (
  id text primary key,
  user_id uuid null references auth.users(id) on delete set null,
  email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'expired', 'failed', 'cancelled')),
  payment_method text not null
    check (payment_method in ('bitcoin', 'bank', 'card')),
  payment_reference text null,
  subtotal numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  currency text not null default 'EUR',
  locale text not null default 'en',
  shipping_address jsonb null,
  metadata jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz null
);

create index if not exists orders_user_id_idx on public.orders (user_id, created_at desc);
create index if not exists orders_email_idx on public.orders (email);

create table if not exists public.order_items (
  id bigserial primary key,
  order_id text not null references public.orders(id) on delete cascade,
  product_id text not null,
  slug text not null,
  title text not null,
  variant text not null default '',
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null,
  currency text not null default 'EUR'
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- Row level security
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Authenticated users can read their own orders
create policy if not exists "orders_owner_select" on public.orders
  for select using (auth.uid() = user_id);
create policy if not exists "order_items_owner_select" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- Inserts/updates flow through the service-role key from API routes, which bypasses RLS.
