import * as React from "react";
import styles from "./label.module.css";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    return <label ref={ref} className={`${styles.label} ${className}`.trim()} {...props} />;
  }
);

Label.displayName = "Label";
