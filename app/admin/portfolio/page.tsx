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
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  uploadImage,
} from "@/app/admin/actions";
import type { PortfolioProject } from "@/content/portofolio";
import { createClient } from "@/utils/supabase/server";
import { resolveStorageUrlForDisplay } from "@/utils/supabase/storage-resolve";
import PortfolioProjectForm from "./portfolio-project-form";
import styles from "./portfolio.module.css";

async function savePortfolioAction(formData: FormData) {
  "use server";

  const preparedData = new FormData();
  const editId = String(formData.get("id") ?? "").trim();

  for (const key of ["title", "category", "service_slug"] as const) {
    preparedData.set(key, String(formData.get(key) ?? ""));
  }

  for (let i = 1; i <= 7; i += 1) {
    const imageField = `image_file_${i}`;
    const urlField = `image_url_${i}`;
    const descField = `desc_${i}`;

    const file = formData.get(imageField);
    const existingUrl = String(formData.get(urlField) ?? "").trim();
    let imageUrl = existingUrl;

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
  const editingProject = projects.find((project) => project.id === resolvedSearchParams.edit);

  return (
    <main className={styles.portfolioPage}>
      <section className={styles.panel}>
        <header className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Portfolio Entries</h2>
          <div className={styles.panelControls}>
            <p className={styles.panelMeta}>{projects.length} projects</p>
            <a href="/admin/portofolio" className={styles.resetLink}>
              Reset Form
            </a>
          </div>
        </header>
        <div className={styles.tableWrap}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.colImage}>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className={styles.colActions}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, rowIndex) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.image_url_1 ? (
                      <>
                        {/* CMS supports arbitrary external storage URLs for thumbnails. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={styles.thumb}
                          src={tableThumbSrc[rowIndex] ?? project.image_url_1}
                          alt={project.title}
                        />
                      </>
                    ) : (
                      <span className={styles.empty}>No Image</span>
                    )}
                  </TableCell>
                  <TableCell className={styles.projectTitleCell}>{project.title}</TableCell>
                  <TableCell>
                    <span className={styles.tag}>{project.category}</span>
                  </TableCell>
                  <TableCell>
                    <span className={styles.tag}>{project.service_slug}</span>
                  </TableCell>
                  <TableCell className={styles.colActions}>
                    <div className={styles.tableActions}>
                      <Link href={`/admin/portofolio?edit=${project.id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <form action={deletePortfolio.bind(null, project.id)}>
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
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
        </header>
        <PortfolioProjectForm
          saveAction={savePortfolioAction}
          editingProject={editingProject}
        />
      </section>
    </main>
  );
}
