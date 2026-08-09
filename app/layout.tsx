import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Geist({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Design System",
  description: "Component examples, colors, and icons for the app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body
        className="antialiased"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}