-- 1) Lock down SECURITY DEFINER helper functions from direct API execution
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;

-- 2) Replace always-true INSERT policies with validated submission rules
CREATE OR REPLACE FUNCTION public.is_valid_lead_submission(
  _name text, _email text, _phone text, _consent boolean,
  _status text, _source_form text, _expected_source text,
  _notes text, _follow_up_owner text, _follow_up_date date, _details jsonb
) RETURNS boolean
LANGUAGE sql IMMUTABLE
SET search_path = public
AS $$
  SELECT _consent IS TRUE
     AND _name IS NOT NULL AND length(btrim(_name)) BETWEEN 1 AND 120
     AND _email IS NOT NULL AND length(_email) <= 200
     AND _email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
     AND (_phone IS NULL OR length(_phone) <= 40)
     AND _status = 'New'
     AND _source_form = _expected_source
     AND _notes IS NULL
     AND _follow_up_owner IS NULL
     AND _follow_up_date IS NULL
     AND length(_details::text) <= 8000
$$;

REVOKE ALL ON FUNCTION public.is_valid_lead_submission(text,text,text,boolean,text,text,text,text,text,date,jsonb) FROM anon, authenticated, public;

DO $do$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'call_requests','contact_messages','family_event_registrations','general_interests',
    'information_session_registrations','mentor_interests','organization_partnerships',
    'workshop_registrations','youth_program_interests'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'anyone_submit_' || t, t);
    EXECUTE format($f$
      CREATE POLICY %I ON public.%I
      FOR INSERT TO anon, authenticated
      WITH CHECK (
        public.is_valid_lead_submission(name, email, phone, consent, status, source_form, %L, notes, follow_up_owner, follow_up_date, details)
      )
    $f$, 'anyone_submit_' || t, t, t);
  END LOOP;
END
$do$;
