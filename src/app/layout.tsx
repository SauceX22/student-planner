import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Student Planner",
  description: "A planner for your student life.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <NextTopLoader
              color="#2247dd"
              initialPosition={0.08}
              crawlSpeed={170}
              height={2}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2247dd,0 0 5px #2247dd"
            />
            {children}
            <Toaster richColors duration={2700} />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
