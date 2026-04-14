"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);

const PORTFOLIO_IMAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_PORTFOLIO_BUCKET ?? "portofolio_images";

type PortfolioMutation = {
  title: string;
  category: string;
  service_slug: "akaalabs" | "creative" | "studio";
  image_url_1: string;
  desc_1: string;
  image_url_2: string | null;
  desc_2: string | null;
  image_url_3: string | null;
  desc_3: string | null;
  image_url_4: string | null;
  desc_4: string | null;
  image_url_5: string | null;
  desc_5: string | null;
  image_url_6: string | null;
  desc_6: string | null;
  image_url_7: string | null;
  desc_7: string | null;
};

async function createSessionClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored in Server Components where cookies are read-only
          }
        },
      },
    }
  );
}

async function requireUser() {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { user };
}

function readText(formData: FormData, key: string, required = false) {
  const value = formData.get(key);
  const text = typeof value === "string" ? value.trim() : "";

  if (required && !text) {
    throw new Error(`Missing required field: ${key}`);
  }

  return text;
}

async function buildPayload(formData: FormData) {
  const payload: Partial<PortfolioMutation> = {
    title: readText(formData, "title", true),
    category: readText(formData, "category", true),
    service_slug: readText(
      formData,
      "service_slug",
      true
    ) as PortfolioMutation["service_slug"],
    image_url_1: readText(formData, "image_url_1", true),
    desc_1: readText(formData, "desc_1", true),
  };

  const row = payload as Record<string, string | null>;
  for (let i = 2; i <= 7; i += 1) {
    row[`image_url_${i}`] = readText(formData, `image_url_${i}`) || null;
    row[`desc_${i}`] = readText(formData, `desc_${i}`) || null;
  }

  return payload as PortfolioMutation;
}

export async function uploadImage(file: File) {
  const { user } = await requireUser();
  if (file.size === 0) {
    throw new Error("Empty file upload.");
  }

  const extension = file.name.includes(".")
    ? file.name.split(".").pop()
    : "bin";
  const objectPath = `${user.id}/${Date.now()}-${randomUUID()}.${extension}`;

  const { error } = await supabaseAdmin.storage
    .from(PORTFOLIO_IMAGE_BUCKET)
    .upload(objectPath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    if (error.message.toLowerCase().includes("bucket not found")) {
      throw new Error(
        `Storage bucket "${PORTFOLIO_IMAGE_BUCKET}" was not found. Create it in Supabase Storage or set NEXT_PUBLIC_SUPABASE_PORTFOLIO_BUCKET to an existing bucket name.`
      );
    }

    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from(PORTFOLIO_IMAGE_BUCKET)
    .getPublicUrl(objectPath);
  return data.publicUrl;
}

export async function createPortfolio(formData: FormData) {
  await requireUser();
  const payload = await buildPayload(formData);

  const { error } = await supabaseAdmin.from("portfolios").insert(payload);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/admin/portofolio");
}

export async function updatePortfolio(id: string, formData: FormData) {
  await requireUser();
  const payload = await buildPayload(formData);

  const { error } = await supabaseAdmin.from("portfolios").update(payload).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/admin/portofolio");
}

export async function deletePortfolio(id: string) {
  await requireUser();

  const { error } = await supabaseAdmin.from("portfolios").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/admin/portofolio");
}

export async function signOutAction() {
  await requireUser();
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/auth");
}
