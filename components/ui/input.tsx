import * as React from "react";
import styles from "./input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    const classes = `${styles.input} ${className}`.trim();

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = "Input";
