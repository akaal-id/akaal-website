import "server-only";
import { createClient } from "@/utils/supabase/server";
import type { NewsroomContent } from "@/content/newsroom";

type NewsroomRow = Record<string, unknown>;

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeNewsroomRow(row: NewsroomRow): NewsroomContent {
  const id = asString(row.id);
  const headerText =
    asString(row.header_text) || asString(row.headerText) || "Untitled";
  const slug = asString(row.slug) || toSlug(headerText) || id;
  const image = asString(row.image) || asString(row.image_url);
  const category = asString(row.category) || "general";
  const createdAt =
    asString(row.created_at) ||
    asString(row.createdAt) ||
    new Date().toISOString();
  const paragraphText =
    asString(row.paragraph_text) || asString(row.paragraphText);

  return {
    id,
    slug,
    image,
    header_text: headerText,
    category,
    created_at: createdAt,
    paragraph_text: paragraphText,
  };
}

export async function getAllNewsroomContent(): Promise<NewsroomContent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("newsroom")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => normalizeNewsroomRow(row as NewsroomRow));
}

export async function getNewsroomContentBySlug(
  slug: string
): Promise<NewsroomContent | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("newsroom")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return normalizeNewsroomRow(data as NewsroomRow);
}
