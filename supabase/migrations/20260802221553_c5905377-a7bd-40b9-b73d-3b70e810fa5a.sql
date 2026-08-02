
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DO $do$
DECLARE t text;
DECLARE names text[] := ARRAY[
  'youth_program_interests','general_interests','information_session_registrations',
  'workshop_registrations','call_requests','mentor_interests',
  'organization_partnerships','family_event_registrations','contact_messages'];
BEGIN
FOREACH t IN ARRAY names LOOP
  EXECUTE format($f$
    CREATE TABLE public.%1$I (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      name text NOT NULL,
      email text NOT NULL,
      phone text,
      division text,
      program_or_service text,
      source_form text NOT NULL DEFAULT %1$L,
      status text NOT NULL DEFAULT 'New',
      follow_up_owner text,
      follow_up_date date,
      notes text,
      referral_source text,
      consent boolean NOT NULL DEFAULT false,
      details jsonb NOT NULL DEFAULT '{}'::jsonb
    );
    GRANT INSERT ON public.%1$I TO anon;
    GRANT SELECT, INSERT, UPDATE, DELETE ON public.%1$I TO authenticated;
    GRANT ALL ON public.%1$I TO service_role;
    ALTER TABLE public.%1$I ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "anyone_submit_%1$s" ON public.%1$I FOR INSERT TO anon, authenticated WITH CHECK (true);
    CREATE POLICY "admin_read_%1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
    CREATE POLICY "admin_update_%1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
    CREATE POLICY "admin_delete_%1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
    CREATE TRIGGER set_updated_at_%1$s BEFORE UPDATE ON public.%1$I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  $f$, t);
END LOOP;
END $do$;

CREATE TABLE public.public_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  division text NOT NULL,
  category text NOT NULL,
  event_date text NOT NULL DEFAULT 'Date To Be Announced',
  event_time text NOT NULL DEFAULT 'Details Coming Soon',
  location text NOT NULL DEFAULT 'Details Coming Soon',
  format text NOT NULL DEFAULT 'Virtual',
  description text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  cost text NOT NULL DEFAULT 'Details Coming Soon',
  capacity text,
  registration_deadline text,
  registration_link text,
  attendance text NOT NULL DEFAULT 'Optional',
  featured_image text,
  status text NOT NULL DEFAULT 'Coming Soon',
  sort_order int NOT NULL DEFAULT 0
);
GRANT SELECT ON public.public_events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.public_events TO authenticated;
GRANT ALL ON public.public_events TO service_role;
ALTER TABLE public.public_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_events" ON public.public_events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin_manage_events" ON public.public_events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER set_updated_at_public_events BEFORE UPDATE ON public.public_events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.public_events (title, division, category, description, audience, sort_order) VALUES
('Youth Academy Information Session','Youth Academy','Information Sessions','A live virtual session for parents and guardians covering the Summer Intensive, the 11-Month Leadership Fellowship, enrollment steps, and supported tuition. Bring your questions.','Parents and guardians of students ages 8-18',1),
('Summer Intensive Interest Meeting','Youth Academy','Information Sessions','An overview of the Strong Minds Summer Intensive: literacy, mathematics, leadership, creativity, and the virtual and in-person format.','Families considering summer enrollment',2),
('Saturday Leadership Experience','Youth Academy','Saturday Experiences','A monthly in-person Saturday experience for enrolled fellows focused on leadership, collaboration, and community.','Enrolled fellows',3),
('Parent Night Off','Families','Parent Night Off','A supervised evening experience for registered students with dinner, group games, creative projects, team-building, and a family raffle. Details and registration requirements announced before registration opens.','Registered students and their families',4),
('Raising Leaders at Home','Families','Workshops','A practical family workshop on responsibility, confidence, communication, independence, and decision-making at home. Proposed title, subject to change.','Parents and caregivers',5),
('Relationship Building With Young People','SMILE','Workshops','A practical professional workshop for educators, youth workers, and program staff on building meaningful, accountable relationships with young people.','Educators, youth workers, mentors, program staff',6),
('Executive Function in Everyday Practice','SMILE','Webinars','A working session on embedding executive-function support into daily instruction, programming, and youth interactions.','Educators, paraprofessionals, afterschool staff',7),
('Mentor Information Session','Mentors','Information Sessions','Learn what Strong Minds mentors do, the training and support provided, the time commitment, and how to apply.','Adults interested in mentoring',8),
('Entrepreneurship Showcase','Youth Academy','Showcases','Fellows present the businesses, products, services, and purposeful ideas developed through the Entrepreneurship Lab.','Families, mentors, partners, community',9),
('Community Impact Event','Families','Community Events','A community-centered gathering bringing together students, families, mentors, and partners.','Open to the community',10);
