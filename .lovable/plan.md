# Parent Arena + Enrollment Journey

The Parent Arena replaces the vague "virtual campus" idea on this site with something concrete and genuinely useful: a private, logged-in home base for every Strong Minds family. Student learning can still live in your other campuses — this is the parent-facing layer that connects everything.

## What a parent experiences

1. **Submits any interest or enrollment form** (as today) — instantly receives a welcome email with a link to create their account.
2. **Creates an account** (email + password, or Google) and lands in the Parent Arena.
3. **Dashboard** shows a progress tracker of onboarding tasks with clear due dates:
   - Watch the welcome video
   - Complete orientation — watch the recording, or request the next live date
   - Complete parent contact information
   - Add emergency contacts (at least two)
   - Complete student information
   - Review and sign the Family Handbook
4. **Handbook deadline logic** — due at whichever comes first: 14 days from enrollment, or the student's 3rd day of program participation. The date is shown on the dashboard, with automatic reminder emails and an overdue flag for staff.
5. **Messages** — a private thread with their Strong Minds point of contact. Parent writes, staff replies, both see the history. No parent-to-parent messaging.
6. **Community Board** — a single public room all account holders can read and post in. Every post and reply is held for founder approval before it goes live. Parents see their own pending posts marked "awaiting review"; nobody else sees them until approved.

## What the founder gets

An admin area with:
- **Families** — every account, their onboarding progress, handbook status, and who's overdue
- **Inbox** — all parent message threads in one place, reply inline
- **Moderation queue** — pending community posts to approve, edit, or reject with one click
- **Orientation** — set the recorded video and publish live orientation dates
- **Handbook** — post the current handbook version and see every signature with timestamp

## Community safety rules (built in, not optional)

- No direct parent-to-parent messaging anywhere in the product
- Nothing appears on the board until the founder approves it
- Parents only ever see their own family's data
- Display names on the board are first name + last initial by default
- Every post keeps an audit trail of who approved it and when
- Report button on any live post routes to the founder

## Non-enroller journey

Visitors who submit a form but never enroll get their own track: an interest confirmation email, an invite to the next information session, a reminder before it, and a "still exploring?" check-in later. They can still create an account and access the community board, but their dashboard shows enrollment steps instead of onboarding tasks.

## Payments

Stripe, using Lovable's built-in payments (no separate Stripe account setup needed). Checkout covers the $25 seat reservation, founding-family tuition, the two-payment plan, supported tuition, and event fees. Once a payment succeeds, the family's onboarding clock starts automatically.

## Confirmed decisions

- **Payments**: Stripe.
- **Sign-in**: email + password, plus Google. No magic link — it requires an email round-trip on every login and is a poor fit for shared family devices.
- **Welcome video**: placeholder player on the dashboard until your recording is ready. Until then, the orientation step tells families to schedule a live orientation rather than watch a recording.
- **Handbook**: placeholder document with your real signing terms and deadline logic live from day one, so nothing has to be rebuilt when the final handbook is ready — you just upload the new version.
- **Orientation materials**: your attached documents did not come through. Re-attach and I'll build them in as downloadable orientation resources plus an in-orientation completion checklist parents work through and mark done.

## Technical notes

- Parent accounts use Lovable Cloud auth (email/password + Google). A `profiles` row is created on signup; roles live in the existing `user_roles` table with a new `staff` role alongside `admin`.
- New tables: `profiles`, `families`, `students`, `emergency_contacts`, `onboarding_tasks`, `orientation_sessions`, `orientation_resources`, `handbook_versions`, `handbook_signatures`, `message_threads`, `messages`, `board_posts`, `board_replies`, `post_reports`. All with row-level security scoping parents to their own records and gating board content on `approved` status.
- Orientation documents are stored in Cloud storage so you can swap the handbook and worksheets without a code change.
- Existing lead tables stay as-is; a new account is linked to its originating lead by email so history carries over.
- Parent routes live under the protected `_authenticated` area; admin routes are gated on the `admin`/`staff` role.
- Transactional emails (welcome, task reminders, handbook due, orientation confirmations) send from your verified domain. SMS opt-in and phone number are captured now; actual texting needs a provider connected later.

## Build order

1. Accounts, profiles, roles, and the protected Parent Arena shell
2. Dashboard + onboarding task engine (contact info, emergency contacts, student info)
3. Orientation (live scheduling now, recorded video placeholder) with downloadable materials and completion checklist
4. Handbook signing with the 14-day / 3rd-day deadline logic
5. Messages (parent ↔ point of contact) and the founder inbox
6. Community board with the founder moderation queue
7. Automated emails and the non-enroller nurture track
8. Stripe checkout

