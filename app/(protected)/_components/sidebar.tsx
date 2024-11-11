import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { sidebarMenu } from "./data/menu";
export default function Sidebar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full overflow-auto px-5 pt-8 relative">
      <div className="mb-7">
        <h2>Cattle Mangement</h2>
      </div>

      <nav className="grid gap-y-6">
        {sidebarMenu.map((menu) => {
          return (
            <div key={menu.name}>
              <div className="text-xs text-muted-foreground uppercase mb-3.5">
                {menu.label}
              </div>
              <Accordion type="single" collapsible className="w-full">
                {menu.children.map((menu) => {
                  const Icon = menu.icon!;
                  return (
                    <AccordionItem
                      key={menu.name}
                      disabled={!menu.children?.length}
                      value={menu.name}
                      className="border-b-0"
                    >
                      <AccordionTrigger
                        className={cn(
                          "text-primary hover:no-underline font-medium py-2 px-3 text-sm",
                          !menu.children?.length && "[&>svg]:hidden"
                        )}
                      >
                        <>
                          <span>
                            <Icon className="size-6 mr-3" />
                          </span>
                          <span className="text-foreground flex-1 text-left">
                            {menu.name}
                          </span>
                        </>
                      </AccordionTrigger>
                      {menu.children && (
                        <AccordionContent>
                          <ul className="pt-1.5">
                            {menu.children.map((child, index) => (
                              <li key={child.name + "_" + index}>
                                <Link
                                  className="nav-link block ml-7 group rounded-md relative"
                                  href={child.url}
                                >
                                  <span className="text-foreground group-hover:text-primary">
                                    {child.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
