import * as React from "react";
import styles from "./table.module.css";

function withClass<T extends HTMLElement>(
  Component: React.ElementType,
  className: string,
  displayName: string
) {
  const Wrapped = React.forwardRef<T, React.HTMLAttributes<T>>(
    ({ className: extra = "", ...props }, ref) => (
      <Component ref={ref} className={`${className} ${extra}`.trim()} {...props} />
    )
  );

  Wrapped.displayName = displayName;
  return Wrapped;
}

export const Table = withClass<HTMLTableElement>(
  "table",
  styles.table,
  "Table"
);
export const TableHeader = withClass<HTMLTableSectionElement>(
  "thead",
  styles.header,
  "TableHeader"
);
export const TableBody = withClass<HTMLTableSectionElement>(
  "tbody",
  "",
  "TableBody"
);
export const TableFooter = withClass<HTMLTableSectionElement>(
  "tfoot",
  styles.footer,
  "TableFooter"
);
export const TableRow = withClass<HTMLTableRowElement>(
  "tr",
  styles.row,
  "TableRow"
);
export const TableHead = withClass<HTMLTableCellElement>(
  "th",
  styles.head,
  "TableHead"
);
export const TableCell = withClass<HTMLTableCellElement>(
  "td",
  styles.cell,
  "TableCell"
);
export const TableCaption = withClass<HTMLTableCaptionElement>(
  "caption",
  styles.caption,
  "TableCaption"
);
