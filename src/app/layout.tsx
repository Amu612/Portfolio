import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Amulya Anamdasu | AI/ML & Full Stack Developer",
  description: "Portfolio of Amulya Anamdasu, an AI/ML Developer, Full Stack Developer, and Smart India Hackathon Finalist.",
  keywords: ["Amulya Anamdasu", "AI Developer", "Machine Learning", "Full Stack Developer", "Portfolio"],
  openGraph: {
    title: "Amulya Anamdasu | AI/ML & Full Stack Developer",
    description: "Portfolio of Amulya Anamdasu, an AI/ML Developer, Full Stack Developer, and Smart India Hackathon Finalist.",
    url: "https://amulya-portfolio.vercel.app",
    siteName: "Amulya Anamdasu Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} ${spaceGrotesk.variable} min-h-screen bg-black text-white antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
