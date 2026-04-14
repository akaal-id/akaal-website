"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PortfolioProject } from "@/content/portofolio";
import MediaSourceInput from "./media-source-input";
import styles from "./portfolio.module.css";

type ServiceSlug = "akaalabs" | "creative" | "studio";

const serviceOptions: ServiceSlug[] = ["akaalabs", "creative", "studio"];

const MAX_GALLERY_ROWS = 7;

type PortfolioProjectFormProps = {
  saveAction: (formData: FormData) => Promise<void>;
  editingProject: PortfolioProject | undefined;
};

export default function PortfolioProjectForm({
  saveAction,
  editingProject,
}: PortfolioProjectFormProps) {
  const isEdit = Boolean(editingProject);
  const [visibleGalleryRows, setVisibleGalleryRows] = useState(() =>
    isEdit ? MAX_GALLERY_ROWS : 1
  );

  const showRowControls = !isEdit;
  const canRemoveRow = visibleGalleryRows > 1;
  const canAddRow = visibleGalleryRows < MAX_GALLERY_ROWS;

  return (
    <form
      action={saveAction}
      className={styles.formGrid}
      onReset={() => {
        if (!isEdit) setVisibleGalleryRows(1);
      }}
    >
      <input type="hidden" name="id" defaultValue={editingProject?.id ?? ""} />

      <div className={styles.formRow}>
        <div className={styles.field}>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={editingProject?.title ?? ""}
            required
          />
        </div>
        <div className={styles.field}>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={editingProject?.category ?? ""}
            required
          />
        </div>
        <div className={styles.field}>
          <Label htmlFor="service_slug">Service</Label>
          <select
            id="service_slug"
            name="service_slug"
            className={styles.select}
            defaultValue={
              (editingProject?.service_slug as ServiceSlug | undefined) ?? "akaalabs"
            }
            required
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={styles.galleryHeading}>Deep Dive Gallery</p>

      {Array.from({ length: visibleGalleryRows }, (_, index) => index + 1).map((i) => {
        const enteringNewRow = !isEdit && i === visibleGalleryRows && i >= 2;

        return (
          <motion.div
            key={`gallery-${i}`}
            className={styles.galleryRow}
            initial={isEdit ? false : enteringNewRow ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mediaField}>
              <MediaSourceInput
                label={`Image ${i} (URL or Upload)`}
                imageUrlName={`image_url_${i}`}
                imageFileName={`image_file_${i}`}
                defaultValue={
                  (editingProject?.[`image_url_${i as 1 | 2 | 3 | 4 | 5 | 6 | 7}`] as string | null) ??
                  ""
                }
                required={i === 1}
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={`desc_${i}`}>{`Description ${i}`}</Label>
              <Input
                id={`desc_${i}`}
                name={`desc_${i}`}
                defaultValue={
                  (editingProject?.[`desc_${i as 1 | 2 | 3 | 4 | 5 | 6 | 7}`] as string | null) ?? ""
                }
                required={i === 1}
              />
            </div>
          </motion.div>
        );
      })}

      <div className={styles.actions}>
        <Button type="submit">
          {editingProject ? "Update Project" : "Create Project"}
        </Button>
        <Button type="reset" variant="outline">
          Clear Fields
        </Button>
        {showRowControls ? (
          <div
            className={styles.galleryRowToolbar}
            role="group"
            aria-label="Add or remove gallery rows"
          >
            <button
              type="button"
              className={styles.galleryRowIconBtn}
              disabled={!canRemoveRow}
              aria-label="Remove last gallery row"
              title={!canRemoveRow ? "At least one gallery row is required" : "Remove last row"}
              onClick={() =>
                setVisibleGalleryRows((n) => Math.max(n - 1, 1))
              }
            >
              <Minus strokeWidth={2.25} size={18} aria-hidden />
            </button>
            <div className={styles.galleryRowToolbarMid}>
              {/* <span className={styles.galleryRowToolbarLabel}>Add / delete row</span> */}
              <span className={styles.galleryRowToolbarMeta} aria-live="polite">
                {visibleGalleryRows} / {MAX_GALLERY_ROWS}
              </span>
            </div>
            <button
              type="button"
              className={styles.galleryRowIconBtn}
              disabled={!canAddRow}
              aria-label="Add gallery row"
              title={!canAddRow ? "Maximum of 7 gallery rows" : "Add another row"}
              onClick={() =>
                setVisibleGalleryRows((n) => Math.min(n + 1, MAX_GALLERY_ROWS))
              }
            >
              <Plus strokeWidth={2.25} size={18} aria-hidden />
            </button>
          </div>
        ) : null}
        {editingProject ? (
          <Link href="/admin/portofolio">
            <Button type="button" variant="ghost">
              Cancel Edit
            </Button>
          </Link>
        ) : null}
      </div>
    </form>
  );
}
