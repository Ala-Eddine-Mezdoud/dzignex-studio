import type { Metadata } from "next"; 
import { DM_Sans } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accept Invitation - Dzignex Studio",
  description: "Complete your account setup to join Dzignex Studio",
};

export default function InviteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
          {children}
      </body>
    </html>
  );
}
