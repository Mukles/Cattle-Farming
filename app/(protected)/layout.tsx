import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
