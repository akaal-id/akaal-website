import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { PortfolioProject } from "@/content/portofolio";

const GALLERY_IMAGE_KEYS = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * Rewrites Supabase Storage public URLs to signed URLs so images work when the
 * bucket is private. Non-Supabase URLs are left unchanged.
 */
export async function resolvePortfolioProjectStorageUrls(
  project: PortfolioProject
): Promise<PortfolioProject> {
  const next: PortfolioProject = { ...project };

  await Promise.all(
    GALLERY_IMAGE_KEYS.map(async (i) => {
      const key = `image_url_${i}` as keyof PortfolioProject;
      const raw = project[key];
      if (typeof raw !== "string" || !raw.trim()) return;
      const resolved = await resolveStorageUrlForDisplay(raw);
      if (resolved != null) {
        (next as unknown as Record<string, string | null>)[key] = resolved;
      }
    })
  );

  return next;
}

/**
 * Public object URLs from getPublicUrl() only work if the bucket allows anonymous
 * reads. For private buckets, resolve to a time-limited signed URL for <img src>.
 */
export async function resolveStorageUrlForDisplay(
  url: string | null | undefined
): Promise<string | null> {
  if (url == null || !String(url).trim()) {
    return null;
  }

  const trimmed = String(url).trim();
  const parsed = parseSupabasePublicObjectPath(trimmed);
  if (!parsed) {
    return trimmed;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return trimmed;
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin.storage
    .from(parsed.bucket)
    .createSignedUrl(parsed.path, 60 * 60 * 24 * 365);

  if (error || !data?.signedUrl) {
    return trimmed;
  }

  return data.signedUrl;
}

/** Matches .../storage/v1/object/public/<bucket>/<path> */
function parseSupabasePublicObjectPath(
  url: string
): { bucket: string; path: string } | null {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!m) return null;
    return { bucket: m[1], path: m[2] };
  } catch {
    return null;
  }
}
