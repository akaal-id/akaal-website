import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import styles from "./auth.module.css";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/auth?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/portofolio");
}

export default async function AdminAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [resolvedSearchParams, supabase] = await Promise.all([
    searchParams,
    createClient(),
  ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authWrap}>
        <div className={styles.authBrand}>
          <div className={styles.metaGlass}>
            <span>AKAAL</span>
            <span className={styles.metaAccent}>·</span>
            <span>CMS</span>
          </div>
          <h1 className={styles.authTitle}>Sign in</h1>
          <p className={styles.authSubtitle}>
            Manage portfolio and newsroom content.
          </p>
        </div>

        <div className={styles.authCard}>
          <div className={styles.authCardBody}>
            <form action={loginAction} className={styles.form}>
              {resolvedSearchParams.error ? (
                <p className={styles.error} role="alert">
                  {resolvedSearchParams.error}
                </p>
              ) : null}
              <div className={styles.field}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className={styles.field}>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className={styles.submit}>
                Enter CMS
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
