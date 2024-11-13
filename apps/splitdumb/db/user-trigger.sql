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
