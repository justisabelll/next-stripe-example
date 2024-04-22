import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import { SignOut } from "~/components/signOut";

import { auth } from "~/lib/auth";
import { ThemeProvider, ThemeToggle } from "~/components/ui/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Next Stripe Example",
  description: "Next Stripe Example",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className=" border-muted flex items-center justify-between border-b p-4">
      <h1 className="text-2xl font-bold">Next Stripe Example</h1>
      <div className="flex gap-4">
        {session ? <SignOut /> : null}
        <ThemeToggle />
      </div>
    </nav>
  );
};
