DO $do$
DECLARE t text; adm text := '(EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = ''admin''::public.app_role))';
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'call_requests','contact_messages','family_event_registrations','general_interests',
    'information_session_registrations','mentor_interests','organization_partnerships',
    'workshop_registrations','youth_program_interests'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'admin_read_' || t, t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'admin_update_' || t, t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'admin_delete_' || t, t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING %s', 'admin_read_' || t, t, adm);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO authenticated USING %s WITH CHECK %s', 'admin_update_' || t, t, adm, adm);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO authenticated USING %s', 'admin_delete_' || t, t, adm);
  END LOOP;

  EXECUTE 'DROP POLICY IF EXISTS admin_manage_events ON public.public_events';
  EXECUTE format('CREATE POLICY admin_manage_events ON public.public_events FOR ALL TO authenticated USING %s WITH CHECK %s', adm, adm);
END
$do$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated, anon, public;
