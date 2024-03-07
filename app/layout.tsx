import { Toaster } from "@/components/ui/toaster";
import ClerkClientProvider from "@/provider/ClerkProvider";
import ConvexClientProvider from "@/provider/ConvexClientProvider";
import type { Metadata } from "next";
import { Sunflower } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { Nav } from "@/components/Navbar/MainNavbar";
import { Footer } from "@/components/LandingPage/Footer";

const inter = Sunflower({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Ethereal Archive",
  description: "Upload and Manage files easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ClerkClientProvider>
            {" "}
            <ConvexClientProvider>
              <Nav />
              {children}

              <Footer />
              <Toaster />
            </ConvexClientProvider>
          </ClerkClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
