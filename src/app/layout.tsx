import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-bgDark text-slate-300 font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
