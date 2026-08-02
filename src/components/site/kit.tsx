import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Internal navigation button. `to` is a plain path string. */
export function CTA({
  to,
  children,
  variant = "ink",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "gold" | "ink" | "outline" | "outline-light";
  className?: string;
}) {
  const variants = {
    gold: "btn btn-gold",
    ink: "btn btn-ink",
    outline: "btn btn-outline-ink",
    "outline-light": "btn btn-outline-light",
  } as const;
  return (
    <Link to={to as never} className={cn(variants[variant], className)}>
      {children}
    </Link>
  );
}

export function CTARow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>;
}

export function Section({
  children,
  tone = "default",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "default" | "sand" | "ink" | "card";
  className?: string;
  id?: string;
}) {
  const tones = {
    default: "bg-background",
    sand: "bg-sand",
    ink: "ink-panel",
    card: "bg-card",
  } as const;
  return (
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className={cn("text-3xl md:text-4xl", light ? "text-ink-foreground" : "text-foreground")}>
        {title}
      </h2>
      {lead ? (
        <div
          className={cn(
            "mt-4 space-y-4 text-base md:text-lg leading-relaxed",
            light ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {typeof lead === "string" ? <p>{lead}</p> : lead}
        </div>
      ) : null}
    </div>
  );
}

export function Grid({
  children,
  cols = 3,
  className,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const map = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;
  return <div className={cn("grid gap-5", map[cols], className)}>{children}</div>;
}

export function InfoCard({
  title,
  children,
  footer,
  tone = "light",
  className,
}: {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  tone?: "light" | "ink";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col p-6 rounded-lg",
        tone === "ink"
          ? "bg-ink/95 text-ink-foreground border border-ink-foreground/15"
          : "surface-card",
        className,
      )}
    >
      <h3 className={cn("text-lg", tone === "ink" ? "text-ink-foreground" : "text-foreground")}>
        {title}
      </h3>
      {children ? (
        <div
          className={cn(
            "mt-3 text-sm leading-relaxed flex-1",
            tone === "ink" ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {children}
        </div>
      ) : null}
      {footer ? <div className="mt-5">{footer}</div> : null}
    </div>
  );
}

export function Bullets({
  items,
  light = false,
  columns = 1,
}: {
  items: string[];
  light?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const map = { 1: "", 2: "sm:columns-2", 3: "sm:columns-2 lg:columns-3" } as const;
  return (
    <ul className={cn("space-y-2.5", map[columns])}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex gap-3 text-sm leading-relaxed break-inside-avoid",
            light ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        light ? "bg-ink-foreground/12 text-ink-foreground" : "bg-secondary text-secondary-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="ink-panel">
      <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.05] text-ink-foreground md:text-5xl">{title}</h1>
          {subtitle ? (
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
              {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
            </div>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {image ? (
          <div className="overflow-hidden rounded-xl border border-ink-foreground/15">
            <img
              src={image}
              alt={imageAlt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-gold bg-sand p-5 text-sm leading-relaxed text-foreground">
      {children}
    </div>
  );
}

export function SubNav({ links }: { links: { label: string; to: string }[] }) {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container-page flex gap-1 overflow-x-auto py-2">
        {links.map((l) => (
          <Link
            key={l.to + l.label}
            to={l.to as never}
            activeProps={{ className: "bg-secondary text-foreground" }}
            className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}