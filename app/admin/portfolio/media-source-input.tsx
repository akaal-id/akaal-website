"use client";

import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import styles from "./media-source-input.module.css";

type MediaSourceInputProps = {
  label: string;
  imageUrlName: string;
  imageFileName: string;
  defaultValue: string;
  required?: boolean;
};

export default function MediaSourceInput({
  label,
  imageUrlName,
  imageFileName,
  defaultValue,
  required = false,
}: MediaSourceInputProps) {
  const inputId = useId();
  const fileId = useId();
  const [value, setValue] = useState(defaultValue);

  return (
    <div className={styles.wrap}>
      <Label htmlFor={inputId}>{label}</Label>
      <div className={styles.row}>
        <input
          id={inputId}
          name={imageUrlName}
          className={styles.textInput}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="image name or URL"
          required={required}
        />
        <label className={styles.pickButton} htmlFor={fileId}>
          Choose File
        </label>
        <input
          id={fileId}
          className={styles.fileInput}
          name={imageFileName}
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setValue(file.name);
          }}
        />
      </div>
    </div>
  );
}
