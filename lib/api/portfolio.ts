import "server-only";
import { createClient } from "@/utils/supabase/server";
import { resolvePortfolioProjectStorageUrls } from "@/utils/supabase/storage-resolve";
import type { PortfolioProject } from "@/content/portofolio";

async function withResolvedStorageUrls(
  rows: PortfolioProject[]
): Promise<PortfolioProject[]> {
  return Promise.all(rows.map((row) => resolvePortfolioProjectStorageUrls(row)));
}

export async function getShowcaseByService(
  slug: string
): Promise<PortfolioProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("service_slug", slug)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return withResolvedStorageUrls((data ?? []) as PortfolioProject[]);
}

export async function getProjectById(
  id: string
): Promise<PortfolioProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return resolvePortfolioProjectStorageUrls(data as PortfolioProject);
}

export async function getAllProjects(): Promise<PortfolioProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return withResolvedStorageUrls((data ?? []) as PortfolioProject[]);
}
