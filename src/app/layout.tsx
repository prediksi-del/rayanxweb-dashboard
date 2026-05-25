import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RAYANXWEB CONTROL CENTER",
  description: "Next-Generation Secure Socket Infrastructure Dashboard UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-bgDark`}>
        {children}
      </body>
    </html>
  );
}
