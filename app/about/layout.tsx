import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AKAAL",
  description:
    "We are a collective of strategists, designers, and engineers who build digital experiences that move culture forward.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
