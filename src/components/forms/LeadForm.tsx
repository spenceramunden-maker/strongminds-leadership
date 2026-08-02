import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";
import { CTA, CTARow } from "@/components/site/kit";

export type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "number";

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  help?: string;
  half?: boolean;
  showIf?: (values: Record<string, string | boolean>) => boolean;
  noteIf?: (values: Record<string, string | boolean>) => string | null;
};

export type LeadFormProps = {
  table:
    | "youth_program_interests"
    | "general_interests"
    | "information_session_registrations"
    | "workshop_registrations"
    | "call_requests"
    | "mentor_interests"
    | "organization_partnerships"
    | "family_event_registrations"
    | "contact_messages";
  sourceForm: string;
  title: string;
  intro?: string;
  fields: Field[];
  nameField: string;
  emailField?: string;
  phoneField?: string;
  divisionField?: string;
  programField?: string;
  referralField?: string;
  consentField?: string;
  submitLabel?: string;
  nextSteps: string[];
};

function isVisible(field: Field, values: Record<string, string | boolean>) {
  return field.showIf ? field.showIf(values) : true;
}

export function LeadForm(props: LeadFormProps) {
  const {
    table,
    sourceForm,
    title,
    intro,
    fields,
    nameField,
    emailField = "email",
    phoneField = "phone",
    divisionField,
    programField,
    referralField,
    consentField,
    submitLabel = "Submit",
    nextSteps,
  } = props;

  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (name: string, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const str = (name?: string) => {
    if (!name) return null;
    const v = values[name];
    return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const email = str(emailField);
    const name = str(nameField);
    if (!name || !email) {
      toast.error("Please provide your name and email address.");
      return;
    }
    if (consentField && values[consentField] !== true) {
      toast.error("Please confirm consent to be contacted before submitting.");
      return;
    }
    setSubmitting(true);

    const details: Record<string, unknown> = {};
    for (const field of fields) {
      if (!isVisible(field, values)) continue;
      const raw = values[field.name];
      if (raw === undefined || raw === "") continue;
      details[field.label] = raw;
    }

    const { error } = await supabase.from(table).insert({
      name,
      email,
      phone: str(phoneField),
      division: str(divisionField),
      program_or_service: str(programField),
      referral_source: str(referralField),
      source_form: sourceForm,
      consent: consentField ? values[consentField] === true : true,
      details: details as never,
    });

    setSubmitting(false);
    if (error) {
      toast.error("We could not save your submission. Please try again or use the contact page.");
      return;
    }
    setDone(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="surface-card p-8">
        <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden />
        <h2 className="mt-4 text-2xl">Thank you.</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Your information has been received by the Strong Minds team. We will review your
          submission and follow up using the contact information you provided.
        </p>
        <div className="mt-6">
          <p className="eyebrow mb-3">What happens next</p>
          <ul className="space-y-2.5">
            {nextSteps.map((step) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <CTARow className="mt-8">
          <CTA to="/" variant="ink">
            Return Home
          </CTA>
          <CTA to="/events" variant="outline">
            View Upcoming Events
          </CTA>
        </CTARow>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <form onSubmit={onSubmit} className="surface-card p-6 md:p-8">
      <h2 className="text-2xl">{title}</h2>
      {intro ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          if (!isVisible(field, values)) return null;
          const note = field.noteIf?.(values) ?? null;
          const id = `${sourceForm}-${field.name}`;
          const type = field.type ?? "text";

          if (type === "checkbox") {
            return (
              <div key={field.name} className="sm:col-span-2">
                <label htmlFor={id} className="flex items-start gap-3 text-sm text-foreground">
                  <input
                    id={id}
                    type="checkbox"
                    checked={values[field.name] === true}
                    onChange={(e) => set(field.name, e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[var(--gold)]"
                  />
                  <span>
                    {field.label}
                    {field.required ? <span className="text-destructive"> *</span> : null}
                  </span>
                </label>
              </div>
            );
          }

          return (
            <div key={field.name} className={field.half ? "" : "sm:col-span-2"}>
              <label
                htmlFor={id}
                className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-foreground"
              >
                {field.label}
                {field.required ? <span className="text-destructive"> *</span> : null}
              </label>

              {type === "textarea" ? (
                <textarea
                  id={id}
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  className={inputClass}
                />
              ) : type === "select" ? (
                <select
                  id={id}
                  required={field.required}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select an option</option>
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={type}
                  required={field.required}
                  placeholder={field.placeholder}
                  maxLength={255}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  className={inputClass}
                />
              )}

              {field.help ? (
                <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>
              ) : null}
              {note ? (
                <p className="mt-2 rounded-md border-l-4 border-gold bg-sand p-3 text-xs leading-relaxed text-foreground">
                  {note}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <button type="submit" disabled={submitting} className="btn btn-gold mt-7 w-full sm:w-auto">
        {submitting ? "Submitting..." : submitLabel}
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Submissions are stored securely and reviewed by the Strong Minds team. Please do not submit
        Social Security numbers, medical records, or other sensitive documentation through this
        form.
      </p>
    </form>
  );
}