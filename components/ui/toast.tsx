import * as React from "react";

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

export function Toast({
  title,
  description,
  className = "",
  children,
  ...props
}: ToastProps) {
  return (
    <div
      className={`border border-zinc-800 bg-zinc-950 p-4 text-white shadow-xl shadow-black/40 ${className}`.trim()}
      {...props}
    >
      {title ? <h4 className="text-sm font-semibold">{title}</h4> : null}
      {description ? <p className="mt-1 text-sm text-zinc-400">{description}</p> : null}
      {children}
    </div>
  );
}
