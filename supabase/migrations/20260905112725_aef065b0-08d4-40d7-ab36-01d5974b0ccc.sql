-- ============ HELPERS ============
CREATE OR REPLACE FUNCTION public.is_smla_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','staff'));
$$;
REVOKE EXECUTE ON FUNCTION public.is_smla_staff(uuid) FROM PUBLIC, anon, authenticated;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL DEFAULT '',
  display_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text,
  sms_opt_in boolean NOT NULL DEFAULT false,
  preferred_contact text
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ FAMILIES ============
CREATE TABLE public.families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  family_name text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Prospective',
  program text,
  poc_name text NOT NULL DEFAULT 'Strong Minds Team',
  poc_email text NOT NULL DEFAULT 'info@strongmindsleadershipacademy.org',
  enrolled_at timestamptz,
  first_participation_date date,
  handbook_due_at date,
  mailing_address text,
  city text,
  state text,
  postal_code text,
  staff_notes text
);
CREATE UNIQUE INDEX families_owner_idx ON public.families(owner_id);
GRANT SELECT, INSERT, UPDATE ON public.families TO authenticated;
GRANT ALL ON public.families TO service_role;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
CREATE POLICY "family read" ON public.families FOR SELECT TO authenticated
  USING (owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "family insert" ON public.families FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "family self update" ON public.families FOR UPDATE TO authenticated
  USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "family staff update" ON public.families FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE TRIGGER set_updated_at_families BEFORE UPDATE ON public.families FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- handbook deadline: earlier of enrolled_at + 14 days, or 3rd day of participation
CREATE OR REPLACE FUNCTION public.set_handbook_due()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE d14 date; d3 date;
BEGIN
  d14 := CASE WHEN NEW.enrolled_at IS NULL THEN NULL ELSE (NEW.enrolled_at::date + 14) END;
  d3  := CASE WHEN NEW.first_participation_date IS NULL THEN NULL ELSE (NEW.first_participation_date + 2) END;
  NEW.handbook_due_at := LEAST(COALESCE(d14, d3), COALESCE(d3, d14));
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.set_handbook_due() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER families_handbook_due BEFORE INSERT OR UPDATE ON public.families FOR EACH ROW EXECUTE FUNCTION public.set_handbook_due();

-- ============ STUDENTS ============
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date,
  grade text,
  school text,
  program text,
  shirt_size text,
  allergies text,
  support_needs text,
  photo_release boolean NOT NULL DEFAULT false
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students read" ON public.students FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "students write" ON public.students FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "students update" ON public.students FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "students delete" ON public.students FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE TRIGGER set_updated_at_students BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ EMERGENCY CONTACTS ============
CREATE TABLE public.emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  name text NOT NULL,
  relationship text NOT NULL,
  phone text NOT NULL,
  email text,
  is_authorized_pickup boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.emergency_contacts TO authenticated;
GRANT ALL ON public.emergency_contacts TO service_role;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ec read" ON public.emergency_contacts FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "ec insert" ON public.emergency_contacts FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "ec update" ON public.emergency_contacts FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "ec delete" ON public.emergency_contacts FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE TRIGGER set_updated_at_ec BEFORE UPDATE ON public.emergency_contacts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ ONBOARDING TASKS ============
CREATE TABLE public.onboarding_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  task_key text NOT NULL,
  label text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'Not started',
  completed_at timestamptz,
  due_at date,
  sort_order integer NOT NULL DEFAULT 0,
  UNIQUE (family_id, task_key)
);
GRANT SELECT, INSERT, UPDATE ON public.onboarding_tasks TO authenticated;
GRANT ALL ON public.onboarding_tasks TO service_role;
ALTER TABLE public.onboarding_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "task read" ON public.onboarding_tasks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "task insert" ON public.onboarding_tasks FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "task update" ON public.onboarding_tasks FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (true);
CREATE TRIGGER set_updated_at_tasks BEFORE UPDATE ON public.onboarding_tasks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ ORIENTATION ============
CREATE TABLE public.orientation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  starts_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  format text NOT NULL DEFAULT 'Virtual',
  location_or_link text,
  capacity integer,
  notes text,
  is_published boolean NOT NULL DEFAULT true
);
GRANT SELECT ON public.orientation_sessions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orientation_sessions TO authenticated;
GRANT ALL ON public.orientation_sessions TO service_role;
ALTER TABLE public.orientation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orientation public read" ON public.orientation_sessions FOR SELECT USING (is_published = true);
CREATE POLICY "orientation staff manage" ON public.orientation_sessions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE TRIGGER set_updated_at_orientation BEFORE UPDATE ON public.orientation_sessions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.orientation_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  session_id uuid REFERENCES public.orientation_sessions(id) ON DELETE SET NULL,
  mode text NOT NULL DEFAULT 'Live session',
  status text NOT NULL DEFAULT 'Requested',
  attendees integer NOT NULL DEFAULT 1,
  note text
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orientation_registrations TO authenticated;
GRANT ALL ON public.orientation_registrations TO service_role;
ALTER TABLE public.orientation_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "oreg read" ON public.orientation_registrations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "oreg insert" ON public.orientation_registrations FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "oreg update" ON public.orientation_registrations FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (true);
CREATE POLICY "oreg delete" ON public.orientation_registrations FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE TRIGGER set_updated_at_oreg BEFORE UPDATE ON public.orientation_registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.orientation_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  description text,
  storage_path text,
  external_url text,
  kind text NOT NULL DEFAULT 'Document',
  is_required boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orientation_resources TO authenticated;
GRANT ALL ON public.orientation_resources TO service_role;
ALTER TABLE public.orientation_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "resource read" ON public.orientation_resources FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "resource staff manage" ON public.orientation_resources FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE TRIGGER set_updated_at_resources BEFORE UPDATE ON public.orientation_resources FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.resource_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES public.orientation_resources(id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (family_id, resource_id)
);
GRANT SELECT, INSERT, DELETE ON public.resource_completions TO authenticated;
GRANT ALL ON public.resource_completions TO service_role;
ALTER TABLE public.resource_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rc read" ON public.resource_completions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "rc insert" ON public.resource_completions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "rc delete" ON public.resource_completions FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));

-- ============ HANDBOOK ============
CREATE TABLE public.handbook_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  version_label text NOT NULL,
  summary text,
  storage_path text,
  external_url text,
  body text,
  is_current boolean NOT NULL DEFAULT false,
  published_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.handbook_versions TO authenticated;
GRANT ALL ON public.handbook_versions TO service_role;
ALTER TABLE public.handbook_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "handbook read" ON public.handbook_versions FOR SELECT TO authenticated USING (true);
CREATE POLICY "handbook staff manage" ON public.handbook_versions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE TRIGGER set_updated_at_handbook BEFORE UPDATE ON public.handbook_versions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.handbook_signatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  handbook_version_id uuid NOT NULL REFERENCES public.handbook_versions(id) ON DELETE CASCADE,
  signed_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signed_name text NOT NULL,
  relationship text,
  agreed boolean NOT NULL DEFAULT true,
  signed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (family_id, handbook_version_id)
);
GRANT SELECT, INSERT ON public.handbook_signatures TO authenticated;
GRANT ALL ON public.handbook_signatures TO service_role;
ALTER TABLE public.handbook_signatures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sig read" ON public.handbook_signatures FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "sig insert" ON public.handbook_signatures FOR INSERT TO authenticated
  WITH CHECK (signed_by = auth.uid() AND agreed = true
    AND EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));

-- ============ MESSAGES ============
CREATE TABLE public.message_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  subject text NOT NULL DEFAULT 'Your Strong Minds team',
  status text NOT NULL DEFAULT 'Open',
  last_message_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX message_threads_family_idx ON public.message_threads(family_id);
GRANT SELECT, INSERT, UPDATE ON public.message_threads TO authenticated;
GRANT ALL ON public.message_threads TO service_role;
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "thread read" ON public.message_threads FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "thread insert" ON public.message_threads FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid()));
CREATE POLICY "thread update" ON public.message_threads FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.families f WHERE f.id = family_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (true);
CREATE TRIGGER set_updated_at_threads BEFORE UPDATE ON public.message_threads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  thread_id uuid NOT NULL REFERENCES public.message_threads(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_role text NOT NULL DEFAULT 'parent',
  body text NOT NULL,
  read_by_staff boolean NOT NULL DEFAULT false,
  read_by_parent boolean NOT NULL DEFAULT false
);
GRANT SELECT, INSERT, UPDATE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "msg read" ON public.messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.message_threads t JOIN public.families f ON f.id = t.family_id
                 WHERE t.id = thread_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "msg insert" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid() AND length(btrim(body)) BETWEEN 1 AND 5000
    AND (EXISTS (SELECT 1 FROM public.message_threads t JOIN public.families f ON f.id = t.family_id
                 WHERE t.id = thread_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff'))));
CREATE POLICY "msg update" ON public.messages FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.message_threads t JOIN public.families f ON f.id = t.family_id
                 WHERE t.id = thread_id AND f.owner_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (true);

-- ============ COMMUNITY BOARD ============
CREATE TABLE public.board_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_display_name text NOT NULL,
  topic text NOT NULL DEFAULT 'General',
  title text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  moderation_note text,
  approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at timestamptz
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.board_posts TO authenticated;
GRANT ALL ON public.board_posts TO service_role;
ALTER TABLE public.board_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "post read" ON public.board_posts FOR SELECT TO authenticated
  USING (status = 'Approved' OR author_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "post insert" ON public.board_posts FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND status = 'Pending' AND approved_by IS NULL AND approved_at IS NULL
    AND moderation_note IS NULL
    AND length(btrim(title)) BETWEEN 3 AND 140 AND length(btrim(body)) BETWEEN 1 AND 5000);
CREATE POLICY "post staff manage" ON public.board_posts FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "post author delete" ON public.board_posts FOR DELETE TO authenticated
  USING (author_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE TRIGGER set_updated_at_posts BEFORE UPDATE ON public.board_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.board_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  post_id uuid NOT NULL REFERENCES public.board_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_display_name text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  moderation_note text,
  approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at timestamptz
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.board_replies TO authenticated;
GRANT ALL ON public.board_replies TO service_role;
ALTER TABLE public.board_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reply read" ON public.board_replies FOR SELECT TO authenticated
  USING (status = 'Approved' OR author_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "reply insert" ON public.board_replies FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND status = 'Pending' AND approved_by IS NULL AND approved_at IS NULL
    AND moderation_note IS NULL AND length(btrim(body)) BETWEEN 1 AND 3000
    AND EXISTS (SELECT 1 FROM public.board_posts p WHERE p.id = post_id AND p.status = 'Approved'));
CREATE POLICY "reply staff manage" ON public.board_replies FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "reply delete" ON public.board_replies FOR DELETE TO authenticated
  USING (author_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE TRIGGER set_updated_at_replies BEFORE UPDATE ON public.board_replies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.post_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  reporter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.board_posts(id) ON DELETE CASCADE,
  reply_id uuid REFERENCES public.board_replies(id) ON DELETE CASCADE,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'Open'
);
GRANT SELECT, INSERT ON public.post_reports TO authenticated;
GRANT ALL ON public.post_reports TO service_role;
ALTER TABLE public.post_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "report read" ON public.post_reports FOR SELECT TO authenticated
  USING (reporter_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('admin','staff')));
CREATE POLICY "report insert" ON public.post_reports FOR INSERT TO authenticated
  WITH CHECK (reporter_id = auth.uid() AND status = 'Open' AND length(btrim(reason)) BETWEEN 1 AND 1000);
