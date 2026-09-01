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
     AND _source_form IS NOT NULL
     AND length(btrim(_source_form)) BETWEEN 1 AND 120
     AND _notes IS NULL
     AND _follow_up_owner IS NULL
     AND _follow_up_date IS NULL
     AND length(_details::text) <= 8000
$$;

REVOKE ALL ON FUNCTION public.is_valid_lead_submission(text,text,text,boolean,text,text,text,text,text,date,jsonb) FROM anon, authenticated, public;