create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
    insert into public.user_profiles (id, email, username)
    values (new.id, new.email, new.raw_user_meta_data ->> 'username');
    return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_create_user_profile
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Enable MODDATETIME extension
create extension if not exists moddatetime schema extensions;

-- This will set the `updated_at` column on every update
create trigger handle_updated_at before update on groups
  for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before update on expenses
  for each row execute procedure moddatetime (updated_at);
