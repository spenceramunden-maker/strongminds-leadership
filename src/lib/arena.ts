export type TaskStatus = "Not started" | "In progress" | "Complete";

export type TaskDef = {
  key: string;
  label: string;
  description: string;
  to: string;
  sortOrder: number;
};

/** The onboarding journey every enrolled family works through. */
export const TASK_DEFS: TaskDef[] = [
  {
    key: "welcome_video",
    label: "Watch the welcome video",
    description: "A short introduction to Strong Minds from our founder.",
    to: "/arena/orientation",
    sortOrder: 1,
  },
  {
    key: "orientation",
    label: "Complete orientation",
    description: "Request a live orientation date and work through the orientation materials.",
    to: "/arena/orientation",
    sortOrder: 2,
  },
  {
    key: "parent_contact",
    label: "Complete your contact information",
    description: "Phone, mailing address, and how you would like us to reach you.",
    to: "/arena/family",
    sortOrder: 3,
  },
  {
    key: "emergency_contacts",
    label: "Add emergency contacts",
    description: "At least two people we can reach if we cannot reach you.",
    to: "/arena/family",
    sortOrder: 4,
  },
  {
    key: "student_info",
    label: "Complete student information",
    description: "Your student's details, allergies, and any support needs.",
    to: "/arena/students",
    sortOrder: 5,
  },
  {
    key: "handbook",
    label: "Review and sign the Family Handbook",
    description: "Due 14 days after enrollment, or your student's third program day.",
    to: "/arena/handbook",
    sortOrder: 6,
  },
];

export const TASK_BY_KEY = Object.fromEntries(TASK_DEFS.map((t) => [t.key, t]));

export function displayNameFrom(fullName: string, fallback: string) {
  const clean = fullName.trim();
  if (!clean) return fallback;
  const parts = clean.split(/\s+/);
  const first = parts[0] ?? clean;
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  return last ? `${first} ${last[0]!.toUpperCase()}.` : first;
}

export function formatDate(value?: string | null) {
  if (!value) return null;
  const d = new Date(value.length <= 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

export function formatDateTime(value?: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function daysUntil(date?: string | null) {
  if (!date) return null;
  const target = new Date(`${date.slice(0, 10)}T23:59:59`);
  if (Number.isNaN(target.getTime())) return null;
  return Math.ceil((target.getTime() - Date.now()) / 86_400_000);
}
