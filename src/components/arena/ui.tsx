import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const inputClass =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function Panel({
  title,
  description,
  children,
  actions,
  className,
}: {
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-card rounded-lg p-6", className)}>
      {title ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg text-foreground">{title}</h2>
            {description ? (
              <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </div>
            ) : null}
          </div>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Complete" || status === "Approved" || status === "Confirmed"
      ? "bg-gold/25 text-foreground"
      : status === "In progress" || status === "Pending" || status === "Requested"
        ? "bg-secondary text-secondary-foreground"
        : status === "Rejected" || status === "Overdue"
          ? "bg-destructive/15 text-destructive"
          : "bg-muted text-muted-foreground";
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", tone)}>
      {status}
    </span>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-foreground">
      {children}
    </div>
  );
}
