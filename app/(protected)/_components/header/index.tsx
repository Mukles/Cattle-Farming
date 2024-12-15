import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu } from "lucide-react";
import Sidebar from "../sidebar";
import ThemeSwitcher from "../theme-switcher";
import ProfileDashboardMenu from "./profile-menu";
import Search from "./search";

export default function Header() {
  return (
    <header className="py-4 px-6 flex-1 bg-card border-b border-border">
      <nav className="flex items-center gap-6 justify-between">
        <div className="flex flex-1 gap-4 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="bg-card w-11 h-11"
                variant={"outline"}
                size={"icon"}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="px-0" side="left">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <Search />
        </div>

        <div>
          <ul className="flex items-center gap-3">
            <li className="relative flex items-center">
              <ThemeSwitcher />
            </li>
            <li className="relative flex items-center">
              <Button
                className="rounded-full border border-border bg-transparent relative"
                variant={"outline"}
                size={"icon"}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute block top-0 right-1 size-2 translate-x-1/2 bg-[#FD853A] z-30 rounded-full" />
              </Button>
            </li>
            <li className="relative flex items-center">
              <ProfileDashboardMenu />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
