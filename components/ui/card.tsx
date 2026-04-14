import * as React from "react";
import styles from "./card.module.css";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Card({ className = "", ...props }: DivProps) {
  return <div className={`${styles.card} ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`${styles.header} ${className}`.trim()} {...props} />;
}

export function CardTitle({ className = "", ...props }: HeadingProps) {
  return (
    <h3 className={`${styles.title} ${className}`.trim()} {...props} />
  );
}

export function CardDescription({ className = "", ...props }: ParagraphProps) {
  return <p className={`${styles.description} ${className}`.trim()} {...props} />;
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`${styles.content} ${className}`.trim()} {...props} />;
}

export function CardFooter({ className = "", ...props }: DivProps) {
  return <div className={`${styles.footer} ${className}`.trim()} {...props} />;
}
