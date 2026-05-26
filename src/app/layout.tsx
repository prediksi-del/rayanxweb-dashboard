import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LogicContainer from "@/components/LogicContainer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-950 text-slate-200">
        <AuthProvider>
          <LogicContainer>
            {children}
          </LogicContainer>
        </AuthProvider>
      </body>
    </html>
  );
}
