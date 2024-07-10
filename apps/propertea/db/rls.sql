alter table property enable row level security;
alter table expense enable row level security;

create policy "User can see their own properties only."
on "public"."property"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));

create policy "User can see their own expenses only"
on "public"."expense"
as permissive
for select
to authenticated
using (
    property_id in (
        select id
        from "public"."property"
        where user_id = (select auth.uid()) -- no join
    )
);

create policy "User can create their own properties"
on "public"."property"
as permissive
for insert
to authenticated
with check (true);

create policy "User can create their own expenses"
on "public"."expense"
as permissive
for insert
to authenticated
with check (
    (property_id in (
        select property.id
        from "public"."property"
        where user_id = (select auth.uid()) -- no join
    ))
);
