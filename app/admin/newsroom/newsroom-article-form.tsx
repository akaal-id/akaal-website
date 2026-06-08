"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NewsroomContent } from "@/content/newsroom";
import MediaSourceInput from "../portfolio/media-source-input";
import RichTextEditor from "./rich-text-editor";
import styles from "./newsroom.module.css";

type NewsroomArticleFormProps = {
  saveAction: (formData: FormData) => Promise<void>;
  editingArticle: NewsroomContent | undefined;
};

export default function NewsroomArticleForm({
  saveAction,
  editingArticle,
}: NewsroomArticleFormProps) {
  const isEdit = Boolean(editingArticle);

  return (
    <form
      key={editingArticle?.id ?? "new"}
      action={saveAction}
      className={styles.formGrid}
    >
      <input type="hidden" name="id" defaultValue={editingArticle?.id ?? ""} />

      <div className={styles.formRow}>
        <div className={styles.field}>
          <Label htmlFor="header_text">Header Text</Label>
          <Input
            id="header_text"
            name="header_text"
            defaultValue={editingArticle?.header_text ?? ""}
            required
          />
        </div>
        <div className={styles.field}>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={editingArticle?.slug ?? ""}
            placeholder="auto-generated from header if empty"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={editingArticle?.category ?? ""}
            placeholder="PRESS, CASE STUDY, PRODUCT..."
            required
          />
        </div>
        <div className={styles.mediaField}>
          <MediaSourceInput
            key={`${editingArticle?.id ?? "new"}-image`}
            label="Hero Image (URL or Upload)"
            imageUrlName="image"
            imageFileName="image_file"
            defaultValue={editingArticle?.image ?? ""}
          />
        </div>
      </div>

      <div className={styles.field}>
        <Label htmlFor="paragraph_text">Body</Label>
        <RichTextEditor
          key={editingArticle?.id ?? "new-body"}
          name="paragraph_text"
          defaultValue={editingArticle?.paragraph_text ?? ""}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit">
          {editingArticle ? "Update Article" : "Create Article"}
        </Button>
        <Button type="reset" variant="outline">
          Clear Fields
        </Button>
        {isEdit ? (
          <Link href="/admin/newsroom">
            <Button type="button" variant="ghost">
              Cancel Edit
            </Button>
          </Link>
        ) : null}
      </div>
    </form>
  );
}
