import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TASK_DEFS, displayNameFrom } from "@/lib/arena";

export type ArenaData = Awaited<ReturnType<typeof loadArena>>;

async function loadArena() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;
  if (userError || !user) throw new Error("You are not signed in.");

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const metaName = typeof meta["full_name"] === "string" ? (meta["full_name"] as string) : "";
  const metaPhone = typeof meta["phone"] === "string" ? (meta["phone"] as string) : "";
  const metaSms = meta["sms_opt_in"] === true;

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const fallbackName = metaName || user.email?.split("@")[0] || "Strong Minds Family";
    const { data: created, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fallbackName,
        display_name: displayNameFrom(fallbackName, "Strong Minds Family"),
        email: user.email ?? "",
        phone: metaPhone || null,
        sms_opt_in: metaSms,
      })
      .select("*")
      .single();
    if (error) throw error;
    profile = created;
  }

  let { data: family } = await supabase
    .from("families")
    .select("*")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!family) {
    const { data: created, error } = await supabase
      .from("families")
      .insert({
        owner_id: user.id,
        family_name: profile.full_name ? `The ${profile.full_name.split(/\s+/).slice(-1)[0]} Family` : "Our Family",
      })
      .select("*")
      .single();
    if (error) throw error;
    family = created;
  }

  const { data: existingTasks } = await supabase
    .from("onboarding_tasks")
    .select("*")
    .eq("family_id", family.id);

  const have = new Set((existingTasks ?? []).map((t) => t.task_key));
  const missing = TASK_DEFS.filter((t) => !have.has(t.key));
  if (missing.length > 0) {
    await supabase.from("onboarding_tasks").insert(
      missing.map((t) => ({
        family_id: family!.id,
        task_key: t.key,
        label: t.label,
        description: t.description,
        sort_order: t.sortOrder,
        ...(t.key === "handbook" && family!.handbook_due_at
          ? { due_at: family!.handbook_due_at }
          : {}),
      })),
    );
  }

  const { data: tasks } = await supabase
    .from("onboarding_tasks")
    .select("*")
    .eq("family_id", family.id)
    .order("sort_order", { ascending: true });

  const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  const roleNames = (roles ?? []).map((r) => r.role as string);

  return {
    user,
    profile,
    family,
    tasks: tasks ?? [],
    isStaff: roleNames.includes("admin") || roleNames.includes("staff"),
    isAdmin: roleNames.includes("admin"),
  };
}

export function useArena() {
  return useQuery({ queryKey: ["arena"], queryFn: loadArena, staleTime: 30_000 });
}

export function useRefreshArena() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["arena"] });
}

export async function setTaskStatus(
  familyId: string,
  taskKey: string,
  status: "Not started" | "In progress" | "Complete",
) {
  await supabase
    .from("onboarding_tasks")
    .update({ status, completed_at: status === "Complete" ? new Date().toISOString() : null })
    .eq("family_id", familyId)
    .eq("task_key", taskKey);
}
