import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Toaster } from "@/components/ui/toast"

const fontSans = Geist({subsets:['latin'],variable:'--font-sans'});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});


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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body
        className="antialiased"
      >
        <ThemeProvider>{children}          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}