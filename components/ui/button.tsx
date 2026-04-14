import * as React from "react";
import styles from "./button.module.css";

type ButtonVariant = "default" | "outline" | "destructive" | "ghost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantMap: Record<ButtonVariant, string> = {
  default: styles.default,
  outline: styles.outline,
  destructive: styles.destructive,
  ghost: styles.ghost,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", type = "button", ...props }, ref) => {
    const classes = `${styles.button} ${variantMap[variant]} ${className}`.trim();

    return <button ref={ref} type={type} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
