import { SessionProvider } from "next-auth/react";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="inline-flex w-full">
        <aside className="hidden lg:block border-r border-r-border transition-[width] md:w-72 flex-none bg-card">
          <div className="sticky top-0 left-0 h-svh">
            <Sidebar />
          </div>
        </aside>
        <div className="w-full">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
