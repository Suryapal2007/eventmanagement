import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Auth Helpers ───────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ─── Events ─────────────────────────────────────────────────────────────────

export async function getEvents(category?: string) {
  let query = supabase.from("events").select("*").order("date", { ascending: true });
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  return { data, error };
}

export async function getEventById(id: string) {
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
  return { data, error };
}

export async function createEvent(event: Record<string, any>) {
  const { data, error } = await supabase.from("events").insert([event]).select().single();
  return { data, error };
}

export async function updateEvent(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from("events").update(updates).eq("id", id).select().single();
  return { data, error };
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from("events").delete().eq("id", id);
  return { error };
}

// ─── Registrations ──────────────────────────────────────────────────────────

export async function registerForEvent(eventId: string, userId: string, details: Record<string, any>) {
  const { data, error } = await supabase.from("registrations").insert([{
    event_id: eventId,
    user_id: userId,
    status: "confirmed",
    ...details,
  }]).select().single();
  return { data, error };
}

export async function getMyRegistrations(userId: string) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*, events(*)")
    .eq("user_id", userId);
  return { data, error };
}

export async function getEventRegistrations(eventId: string) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*, users(*)")
    .eq("event_id", eventId);
  return { data, error };
}

// ─── Event Updates / Posts ──────────────────────────────────────────────────

export async function getEventUpdates() {
  const { data, error } = await supabase
    .from("event_updates")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createEventUpdate(update: Record<string, any>) {
  const { data, error } = await supabase.from("event_updates").insert([update]).select().single();
  return { data, error };
}

// ─── Notifications ──────────────────────────────────────────────────────────

export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
  return { error };
}

// ─── Profiles ───────────────────────────────────────────────────────────────

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  return { data, error };
}

export async function updateProfile(userId: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single();
  return { data, error };
}

// ─── Announcements ──────────────────────────────────────────────────────────

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createAnnouncement(announcement: Record<string, any>) {
  const { data, error } = await supabase.from("announcements").insert([announcement]).select().single();
  return { data, error };
}
