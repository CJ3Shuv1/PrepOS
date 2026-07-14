-- PrepOS initial schema. Every table is scoped to auth.uid() via RLS.
-- Sensitive protocol/compound tracking is deliberately NOT part of this
-- MVP schema — coaching data only (training, nutrition, check-ins).

create extension if not exists "pgcrypto";

-- ---------- profiles ----------
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  age integer,
  height numeric,
  phase text,
  coaching_start date,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "profiles_all_own" on public.profiles for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- macro_targets (training day vs rest day) ----------
create table public.macro_targets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day_type text not null check (day_type in ('training', 'rest')),
  kcal numeric,
  protein numeric,
  carbs numeric,
  fett numeric,
  updated_at timestamptz not null default now(),
  unique (user_id, day_type)
);

alter table public.macro_targets enable row level security;
create policy "macro_targets_all_own" on public.macro_targets for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- training_days / exercises ----------
create table public.training_days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null,
  label text not null,
  sub text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.training_days enable row level security;
create policy "training_days_all_own" on public.training_days for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day_id uuid not null references public.training_days(id) on delete cascade,
  name text not null,
  sets integer,
  rep_range text,
  tempo text,
  intensity text,
  notes text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.exercises enable row level security;
create policy "exercises_all_own" on public.exercises for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index exercises_day_id_idx on public.exercises(day_id);

-- ---------- nutrition plan (meals, each with a primary + alternative item) ----------
create table public.meal_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  meal_number integer not null,
  variant text not null check (variant in ('primary', 'alternative')),
  food_name text not null,
  amount numeric,
  unit text,
  kcal numeric,
  carbs numeric,
  fett numeric,
  protein numeric,
  fiber numeric,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.meal_items enable row level security;
create policy "meal_items_all_own" on public.meal_items for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index meal_items_meal_idx on public.meal_items(user_id, meal_number);

-- ---------- weight log ----------
create table public.weight_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  weight numeric not null,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.weight_log enable row level security;
create policy "weight_log_all_own" on public.weight_log for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- weekly check-ins ----------
create table public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  sleep_hours numeric,
  sleep_quality integer,
  energy_level integer,
  stress_level integer,
  hunger integer,
  digestion integer,
  steps integer,
  cardio_minutes integer,
  soreness integer,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.checkins enable row level security;
create policy "checkins_all_own" on public.checkins for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- ui preference (glass vs solid), synced across devices ----------
create table public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  ui_style text not null default 'glass' check (ui_style in ('glass', 'solid')),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;
create policy "user_settings_all_own" on public.user_settings for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
