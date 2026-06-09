import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  uploadImage,
} from "@/app/admin/actions";
import type { PortfolioProject } from "@/content/portofolio";
import { createClient } from "@/utils/supabase/server";
import { resolveStorageUrlForDisplay } from "@/utils/supabase/storage-resolve";
import PortfolioProjectForm from "./portfolio-project-form";
import cms from "../cms.module.css";

async function savePortfolioAction(formData: FormData) {
  "use server";

  const preparedData = new FormData();
  const editId = String(formData.get("id") ?? "").trim();
  const supabase = await createClient();

  let existingProject: PortfolioProject | null = null;
  if (editId) {
    const { data } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", editId)
      .maybeSingle();
    existingProject = (data as PortfolioProject | null) ?? null;
  }

  for (const key of ["title", "category", "service_slug"] as const) {
    preparedData.set(key, String(formData.get(key) ?? ""));
  }

  for (let i = 1; i <= 7; i += 1) {
    const imageField = `image_file_${i}`;
    const urlField = `image_url_${i}`;
    const descField = `desc_${i}`;

    const file = formData.get(imageField);
    const existingUrl = String(formData.get(urlField) ?? "").trim();
    const storedUrl =
      (existingProject?.[`image_url_${i as 1 | 2 | 3 | 4 | 5 | 6 | 7}`] as
        | string
        | null
        | undefined) ?? "";
    let imageUrl = existingUrl || storedUrl;

    if (file instanceof File && file.size > 0) {
      imageUrl = await uploadImage(file);
    }

    preparedData.set(urlField, imageUrl);
    preparedData.set(descField, String(formData.get(descField) ?? ""));
  }

  if (editId) {
    await updatePortfolio(editId, preparedData);
  } else {
    await createPortfolio(preparedData);
  }

  redirect("/admin/portofolio");
}

export default async function PortfolioAdminPage({
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
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }

  const projects = (data ?? []) as PortfolioProject[];
  const tableThumbSrc = await Promise.all(
    projects.map((p) => resolveStorageUrlForDisplay(p.image_url_1))
  );
  const editingProject = projects.find(
    (project) => project.id === resolvedSearchParams.edit
  );

  return (
    <main className={cms.page}>
      <header className={cms.pageHeader}>
        <div className={cms.metaGlass}>
          <span>CMS</span>
          <span className={cms.metaAccent}>·</span>
          <span>Portfolio</span>
        </div>
        <h1 className={cms.pageTitle}>Featured Works</h1>
        <p className={cms.pageDescription}>
          Manage case studies, project galleries, and portfolio entries shown across the site.
        </p>
      </header>

      <div className={cms.workspace}>
        <aside className={cms.listColumn}>
          <div className={cms.listHeader}>
            <h2 className={cms.listTitle}>All Projects</h2>
            <span className={cms.listCount}>{projects.length}</span>
          </div>
          <ul className={cms.entryList}>
            {projects.length === 0 ? (
              <li className={cms.emptyState}>No projects yet</li>
            ) : (
              projects.map((project, rowIndex) => {
                const isActive = editingProject?.id === project.id;
                const thumbSrc = tableThumbSrc[rowIndex] ?? project.image_url_1;

                return (
                  <li
                    key={project.id}
                    className={`${cms.entryCard} ${isActive ? cms.entryCardActive : ""}`}
                  >
                    {thumbSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={cms.entryThumb}
                        src={thumbSrc}
                        alt=""
                      />
                    ) : (
                      <div className={`${cms.entryThumb} ${cms.entryThumbEmpty}`}>
                        None
                      </div>
                    )}
                    <div className={cms.entryBody}>
                      <p className={cms.entryTitle}>{project.title}</p>
                      <div className={cms.entryMeta}>
                        <span className={cms.tag}>{project.category}</span>
                        <span className={`${cms.tag} ${cms.tagMuted}`}>
                          {project.service_slug}
                        </span>
                      </div>
                    </div>
                    <div className={cms.entryActions}>
                      <Link
                        href={`/admin/portofolio?edit=${project.id}`}
                        className={cms.iconBtn}
                        title="Edit"
                      >
                        Ed
                      </Link>
                      <form action={deletePortfolio.bind(null, project.id)}>
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
              {editingProject ? "Edit Project" : "New Project"}
            </h2>
            <a href="/admin/portofolio" className={cms.resetLink}>
              Reset
            </a>
          </header>
          <PortfolioProjectForm
            saveAction={savePortfolioAction}
            editingProject={editingProject}
          />
        </section>
      </div>
    </main>
  );
}
