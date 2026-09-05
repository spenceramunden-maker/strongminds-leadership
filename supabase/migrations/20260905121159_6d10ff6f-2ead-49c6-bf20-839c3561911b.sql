create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  slot text not null,
  title text not null,
  description text,
  kind text not null check (kind in ('file','link')),
  external_url text,
  storage_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  unique (slot, title)
);

grant select, insert, update, delete on public.videos to authenticated;
grant all on public.videos to service_role;

alter table public.videos enable row level security;

create policy "Families can view videos"
  on public.videos for select to authenticated
  using (true);

create policy "Staff can add videos"
  on public.videos for insert to authenticated
  with check (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','staff')));

create policy "Staff can edit videos"
  on public.videos for update to authenticated
  using (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','staff')))
  with check (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','staff')));

create policy "Staff can remove videos"
  on public.videos for delete to authenticated
  using (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','staff')));

-- Storage: arena-videos bucket (private)
create policy "Signed-in families can stream arena videos"
  on storage.objects for select to authenticated
  using (bucket_id = 'arena-videos');

create policy "Staff can upload arena videos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'arena-videos'
    and exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','staff'))
  );

create policy "Staff can remove arena videos"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'arena-videos'
    and exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','staff'))
  );