import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { displayNameFrom } from "@/lib/arena";
import { Section } from "@/components/site/kit";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Parent Sign In | Strong Minds Leadership Academy" },
      {
        name: "description",
        content:
          "Sign in to the Strong Minds Parent Arena to complete onboarding, message your point of contact, and join the family community.",
      },
      { property: "og:title", content: "Parent Sign In | Strong Minds Leadership Academy" },
      {
        property: "og:description",
        content: "Your family's home base for onboarding, orientation, and community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const field =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/arena" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/arena`,
            data: { full_name: fullName.trim(), phone: phone.trim(), sms_opt_in: smsOptIn },
          },
        });
        if (error) throw error;
        if (data.user && data.session) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName.trim(),
            display_name: displayNameFrom(fullName, "Strong Minds Family"),
            email: email.trim(),
            phone: phone.trim() || null,
            sms_opt_in: smsOptIn,
          });
          toast.success("Welcome to Strong Minds.");
          void navigate({ to: "/arena" });
        } else {
          toast.success("Check your email to confirm your account, then sign in.");
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        void navigate({ to: "/arena" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/arena` },
    });
    if (error) toast.error(error.message);
  }

  return (
    <Section>
      <div className="mx-auto max-w-md">
        <p className="eyebrow mb-3">Parent Arena</p>
        <h1 className="text-3xl text-foreground md:text-4xl">
          {mode === "signin" ? "Welcome back" : "Create your family account"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your Parent Arena holds your onboarding steps, orientation, the family handbook, a direct
          line to your Strong Minds point of contact, and our moderated family community.
        </p>

        <button type="button" onClick={google} className="btn btn-outline-ink mt-7 w-full">
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or use your email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" ? (
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="fullName">
                Parent / guardian full name
              </label>
              <input
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={field}
              />
            </div>
          ) : null}

          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
            {mode === "signup" ? (
              <p className="mt-1 text-xs text-muted-foreground">At least 8 characters.</p>
            ) : null}
          </div>

          {mode === "signup" ? (
            <>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="phone">
                  Mobile phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={field}
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={smsOptIn}
                  onChange={(e) => setSmsOptIn(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  Text me program reminders and time-sensitive updates. Message and data rates may
                  apply. You can turn this off any time in your Arena.
                </span>
              </label>
            </>
          ) : null}

          <button type="submit" disabled={busy} className="btn btn-gold w-full disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          {mode === "signin" ? "New to Strong Minds? " : "Already have an account? "}
          <button
            type="button"
            className="font-semibold text-foreground underline underline-offset-4"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link to="/terms" className="underline underline-offset-4">
            terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
