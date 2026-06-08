import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createNewsroom,
  deleteNewsroom,
  updateNewsroom,
  uploadImage,
} from "@/app/admin/actions";
import type { NewsroomContent } from "@/content/newsroom";
import { createClient } from "@/utils/supabase/server";
import NewsroomArticleForm from "./newsroom-article-form";
import styles from "./newsroom.module.css";

async function saveNewsroomAction(formData: FormData) {
  "use server";

  const preparedData = new FormData();
  const editId = String(formData.get("id") ?? "").trim();
  const supabase = await createClient();

  let existingArticle: NewsroomContent | null = null;
  if (editId) {
    const { data } = await supabase
      .from("newsroom")
      .select("*")
      .eq("id", editId)
      .maybeSingle();
    existingArticle = (data as NewsroomContent | null) ?? null;
  }

  for (const key of ["header_text", "slug", "category", "paragraph_text"] as const) {
    preparedData.set(key, String(formData.get(key) ?? ""));
  }

  const file = formData.get("image_file");
  const existingUrl = String(formData.get("image") ?? "").trim();
  const storedUrl = existingArticle?.image ?? "";
  let imageUrl = existingUrl || storedUrl;

  if (file instanceof File && file.size > 0) {
    imageUrl = await uploadImage(file);
  }

  preparedData.set("image", imageUrl);

  if (editId) {
    await updateNewsroom(editId, preparedData);
  } else {
    await createNewsroom(preparedData);
  }

  redirect("/admin/newsroom");
}

export default async function NewsroomAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const [resolvedSearchParams, supabase] = await Promise.all([
    searchParams,
    createClient(),
  ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/auth");
  }

  const { data, error } = await supabase
    .from("newsroom")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === "PGRST205") {
      return (
        <main className={styles.newsroomPage}>
          <section className={styles.panel}>
            <header className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Newsroom</h2>
            </header>
            <div className={styles.tableWrap}>
              <p className={styles.empty}>
                Run supabase/newsroom.sql in your Supabase SQL Editor first.
              </p>
            </div>
          </section>
        </main>
      );
    }
    throw new Error(error.message);
  }

  const articles = (data ?? []) as NewsroomContent[];
  const editingArticle = articles.find(
    (article) => article.id === resolvedSearchParams.edit
  );

  return (
    <main className={styles.newsroomPage}>
      <section className={styles.panel}>
        <header className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Newsroom Articles</h2>
          <div className={styles.panelControls}>
            <p className={styles.panelMeta}>{articles.length} articles</p>
            <a href="/admin/newsroom" className={styles.resetLink}>
              Reset Form
            </a>
          </div>
        </header>
        <div className={styles.tableWrap}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.colImage}>Image</TableHead>
                <TableHead>Header</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className={styles.colActions}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    {article.image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={styles.thumb}
                          src={article.image}
                          alt={article.header_text}
                        />
                      </>
                    ) : (
                      <span className={styles.empty}>No Image</span>
                    )}
                  </TableCell>
                  <TableCell className={styles.articleTitleCell}>
                    {article.header_text}
                  </TableCell>
                  <TableCell>
                    <span className={styles.tag}>{article.category}</span>
                  </TableCell>
                  <TableCell>{article.slug}</TableCell>
                  <TableCell className={styles.colActions}>
                    <div className={styles.tableActions}>
                      <Link href={`/admin/newsroom?edit=${article.id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <form action={deleteNewsroom.bind(null, article.id)}>
                        <Button type="submit" variant="destructive">
                          Delete
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className={styles.panel}>
        <header className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            {editingArticle ? "Edit Article" : "Add New Article"}
          </h2>
        </header>
        <NewsroomArticleForm
          saveAction={saveNewsroomAction}
          editingArticle={editingArticle}
        />
      </section>
    </main>
  );
}
