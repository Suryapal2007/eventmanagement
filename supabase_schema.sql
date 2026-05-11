-- ============================================================
-- CampusSphere Supabase Database Schema
-- Run this in your Supabase SQL Editor:
-- https://app.supabase.com > Project > SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES (linked to Supabase Auth) ─────────────────────
create table if not exists profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  name        text,
  email       text unique,
  phone       text,
  department  text,
  year        text,
  roll_no     text,
  bio         text,
  avatar_url  text,
  role        text default 'student' check (role in ('student', 'organizer', 'admin')),
  created_at  timestamp with time zone default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── EVENTS ─────────────────────────────────────────────────
create table if not exists events (
  id              uuid default uuid_generate_v4() primary key,
  title           text not null,
  description     text,
  date            date,
  time            text,
  venue           text,
  category        text,
  price           numeric default 0,
  capacity        integer,
  image_url       text,
  organizer_id    uuid references profiles(id),
  status          text default 'active' check (status in ('active', 'draft', 'closed')),
  is_free         boolean default true,
  payment_method  text default 'razorpay',
  deadline        date,
  created_at      timestamp with time zone default now()
);

-- ─── REGISTRATIONS ──────────────────────────────────────────
create table if not exists registrations (
  id          uuid default uuid_generate_v4() primary key,
  event_id    uuid references events(id) on delete cascade,
  user_id     uuid references profiles(id) on delete cascade,
  name        text,
  email       text,
  phone       text,
  status      text default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled')),
  attended    boolean default false,
  created_at  timestamp with time zone default now(),
  unique(event_id, user_id)
);

-- ─── EVENT UPDATES (organizer posts) ────────────────────────
create table if not exists event_updates (
  id            uuid default uuid_generate_v4() primary key,
  event_name    text not null,
  category      text,
  event_date    date,
  team_leader   text,
  members       jsonb default '[]',
  summary       text,
  description   text,
  image_url     text,
  organizer_id  uuid references profiles(id),
  published     boolean default true,
  views         integer default 0,
  created_at    timestamp with time zone default now()
);

-- ─── ANNOUNCEMENTS ──────────────────────────────────────────
create table if not exists announcements (
  id            uuid default uuid_generate_v4() primary key,
  title         text not null,
  body          text,
  audience      text default 'All Participants',
  pinned        boolean default false,
  organizer_id  uuid references profiles(id),
  created_at    timestamp with time zone default now()
);

-- ─── NOTIFICATIONS ──────────────────────────────────────────
create table if not exists notifications (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references profiles(id) on delete cascade,
  type        text,
  title       text not null,
  message     text,
  read        boolean default false,
  created_at  timestamp with time zone default now()
);

-- ─── CERTIFICATES ───────────────────────────────────────────
create table if not exists certificates (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references profiles(id),
  event_id      uuid references events(id),
  event_name    text,
  issued_on     date default current_date,
  type          text default 'Participation',
  grade         text,
  template_id   integer default 1,
  created_at    timestamp with time zone default now()
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────

alter table profiles       enable row level security;
alter table events         enable row level security;
alter table registrations  enable row level security;
alter table event_updates  enable row level security;
alter table announcements  enable row level security;
alter table notifications  enable row level security;
alter table certificates   enable row level security;

-- Profiles: users can read all, edit only their own
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Events: anyone can read, only organizers can insert/update/delete
create policy "Events are viewable by everyone" on events for select using (true);
create policy "Organizers can manage their events" on events for all using (auth.uid() = organizer_id);

-- Registrations: users can see their own, organizers can see all for their event
create policy "Users can view own registrations" on registrations for select using (auth.uid() = user_id);
create policy "Users can register" on registrations for insert with check (auth.uid() = user_id);

-- Event Updates: anyone can read published ones
create policy "Published updates viewable by all" on event_updates for select using (published = true);
create policy "Organizers can manage updates" on event_updates for all using (auth.uid() = organizer_id);

-- Announcements: anyone can read
create policy "Announcements viewable by all" on announcements for select using (true);
create policy "Organizers can post announcements" on announcements for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('organizer', 'admin'))
);

-- Notifications: users can only see their own
create policy "Users can view own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on notifications for update using (auth.uid() = user_id);

-- Certificates: users can view their own
create policy "Users can view own certificates" on certificates for select using (auth.uid() = user_id);

-- ─── SAMPLE DATA ────────────────────────────────────────────
-- (Optional) Insert sample events after you have a user registered as organizer:
/*
insert into events (title, description, date, venue, category, price, capacity, is_free, status) values
  ('Technova Hackathon 2024', 'The ultimate 24-hour coding challenge.', '2024-06-15', 'Main Auditorium', 'Technical', 0, 200, true, 'active'),
  ('Euphoria Cultural Fest', 'Celebrate campus life with music and dance.', '2024-06-20', 'Open Air Theater', 'Cultural', 199, 150, false, 'active'),
  ('Ignite Startup Pitch', 'Pitch your ideas to real investors.', '2024-07-15', 'Innovation Hub', 'Business', 0, 60, true, 'active');
*/
