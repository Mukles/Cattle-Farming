import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex overflow-y-hidden w-full">
      <aside className="hidden lg:block border-r border-r-border transition-[width] md:w-72 flex-none bg-card h-svh">
        <Sidebar />
      </aside>
      <div className="w-full">
        <main className="h-full p-6">{children}</main>
      </div>
    </div>
  );
}
