alter table public.families add column if not exists payment_due_at date;

create or replace function public.set_handbook_due()
returns trigger
language plpgsql
set search_path = public
as $fn$
declare d14 date; d3 date;
begin
  d14 := case when new.enrolled_at is null then null else (new.enrolled_at::date + 14) end;
  d3 := case when new.first_participation_date is null then null else (new.first_participation_date + 2) end;
  new.handbook_due_at := least(coalesce(d14, d3), coalesce(d3, d14));
  new.payment_due_at := case when new.first_participation_date is null then null else (new.first_participation_date + 6) end;
  return new;
end; $fn$;

update public.families set payment_due_at = first_participation_date + 6 where first_participation_date is not null and payment_due_at is null;

create policy "Signed-in families can open family documents"
on storage.objects for select to authenticated
using (bucket_id = 'family-documents');

update public.handbook_versions set is_current = false where is_current = true;

insert into public.handbook_versions (version_label, summary, body, external_url, is_current, published_at)
values (
  'Parent Handbook 2026.1',
  'The official Strong Minds Youth Leadership Academy Parent Handbook. Please read it in full, then sign below.',
  $body$STRONG MINDS PARENT HANDBOOK

Welcome
Welcome to the Strong Minds Youth Leadership Academy. This handbook is editable so it can grow with the program.

Our Mission
Develop confident learners and courageous leaders through academics, mentorship, leadership, and emotional growth.

Communication
Primary communication will occur through email, text, and scheduled office hours.

Attendance
Consistent attendance is expected. Please notify us of absences.

Technology
Scholars should join sessions with a charged device, camera, and internet connection.

Family Partnership
Families are partners in encouraging participation, growth, and reflection.

Friday Fun & Fitness
Optional in-person community experiences announced in advance.

Scholar Expectations
Respect, effort, curiosity, integrity, and kindness.

Tuition & Payment
No payment is due when you enroll your student. Tuition payment is due within the first 7 days of your student's program. We will send an invoice and a secure payment link before the due date.

Contact Information
Email us anytime at info@strongmindsleadershipacademy.org, or reach our founder directly at founder@strongmindsleadershipacademy.org.$body$,
  'storage:parent-handbook.docx',
  true,
  now()
);

update public.orientation_resources set is_active = false;

insert into public.orientation_resources (title, description, external_url, is_required, is_active, sort_order) values
  ('Family Welcome & Follow-Up Guide', 'You''re in — what happens now: your program path, the five steps to a clear start, what families should know, and what you should see in the first month.', 'storage:family-follow-up.docx', true, true, 1),
  ('Parent Info Session 1: More Than After-School Care (slides)', 'How Strong Minds helps young people build confidence, discipline, judgment, voice, and direction — the student experience, a sample week, and what parents can expect.', 'storage:webinar-1-parent-ready.pptx', true, true, 2),
  ('Parent Info Session 2: Choose the Right Pathway (slides)', 'A practical look at the 4-Week Leadership Lab and the 11-Month Fellowship, what happens after enrollment, and how to choose where your family can commit.', 'storage:webinar-2-enrollment-ready.pptx', true, true, 3),
  ('Program Handbook & Enterprise League Framework', 'The full learning model: missions, guilds, ranks, badges, Strong Minds Capital, showcases, family communication, and what Strong Minds promises — and expects from — families.', 'storage:program-handbook-enterprise-league.docx', true, true, 4);