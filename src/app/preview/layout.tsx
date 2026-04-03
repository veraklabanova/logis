import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logis — Preview",
  description: "Náhled prototypu interní logistiky v mobilním rámečku",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
