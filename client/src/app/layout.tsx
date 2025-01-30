import type { Metadata } from "next";
import "@/styles/index.css"


export const metadata: Metadata = {
  title: "Valentine 2.0",
  description: "Share your love with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
