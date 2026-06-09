import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createNewsroom,
  deleteNewsroom,
  updateNewsroom,
  uploadImage,
} from "@/app/admin/actions";
import type { NewsroomContent } from "@/content/newsroom";
import { createClient } from "@/utils/supabase/server";
import NewsroomArticleForm from "./newsroom-article-form";
import cms from "../cms.module.css";

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
        <main className={cms.page}>
          <header className={cms.pageHeader}>
            <div className={cms.metaGlass}>
              <span>CMS</span>
              <span className={cms.metaAccent}>·</span>
              <span>Newsroom</span>
            </div>
            <h1 className={cms.pageTitle}>Newsroom</h1>
          </header>
          <p className={cms.emptyState}>
            Run supabase/newsroom.sql in your Supabase SQL Editor first.
          </p>
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
    <main className={cms.page}>
      <header className={cms.pageHeader}>
        <div className={cms.metaGlass}>
          <span>CMS</span>
          <span className={cms.metaAccent}>·</span>
          <span>Newsroom</span>
        </div>
        <h1 className={cms.pageTitle}>Editorial</h1>
        <p className={cms.pageDescription}>
          Publish articles, press releases, and announcements to the newsroom.
        </p>
      </header>

      <div className={cms.workspace}>
        <aside className={cms.listColumn}>
          <div className={cms.listHeader}>
            <h2 className={cms.listTitle}>All Articles</h2>
            <span className={cms.listCount}>{articles.length}</span>
          </div>
          <ul className={cms.entryList}>
            {articles.length === 0 ? (
              <li className={cms.emptyState}>No articles yet</li>
            ) : (
              articles.map((article) => {
                const isActive = editingArticle?.id === article.id;

                return (
                  <li
                    key={article.id}
                    className={`${cms.entryCard} ${isActive ? cms.entryCardActive : ""}`}
                  >
                    {article.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={cms.entryThumb}
                        src={article.image}
                        alt=""
                      />
                    ) : (
                      <div className={`${cms.entryThumb} ${cms.entryThumbEmpty}`}>
                        None
                      </div>
                    )}
                    <div className={cms.entryBody}>
                      <p className={cms.entryTitle}>{article.header_text}</p>
                      <div className={cms.entryMeta}>
                        <span className={cms.tag}>{article.category}</span>
                        <span className={`${cms.tag} ${cms.tagMuted}`}>
                          {article.slug}
                        </span>
                      </div>
                    </div>
                    <div className={cms.entryActions}>
                      <Link
                        href={`/admin/newsroom?edit=${article.id}`}
                        className={cms.iconBtn}
                        title="Edit"
                      >
                        Ed
                      </Link>
                      <form action={deleteNewsroom.bind(null, article.id)}>
                        <button
                          type="submit"
                          className={`${cms.iconBtn} ${cms.iconBtnDanger}`}
                          title="Delete"
                        >
                          Del
                        </button>
                      </form>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </aside>

        <section className={cms.editorColumn}>
          <header className={cms.editorHeader}>
            <h2 className={cms.editorTitle}>
              {editingArticle ? "Edit Article" : "New Article"}
            </h2>
            <a href="/admin/newsroom" className={cms.resetLink}>
              Reset
            </a>
          </header>
          <NewsroomArticleForm
            saveAction={saveNewsroomAction}
            editingArticle={editingArticle}
          />
        </section>
      </div>
    </main>
  );
}
