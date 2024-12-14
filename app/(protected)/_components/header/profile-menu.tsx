"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { dashboardMenu } from "../data/menu";

export default function ProfileDashboardMenu() {
  const { data: session, status } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 [&>svg]:data-[state=open]:rotate-180">
          <Image
            src={"/images/avatar.png"}
            alt={session?.user?.firstName || "annonymous"}
            width={44}
            height={44}
          />
          <span className="text-foreground max-md:hidden">
            {status === "authenticated"
              ? `${session?.user?.firstName} ${session?.user?.lastName}`
              : "Annonymous"}
          </span>
          <ChevronDown className="transition-transform" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end">
        {dashboardMenu.map((child) => (
          <Link
            key={child.name}
            href={child.url}
            className="link block whitespace-nowrap rounded-md px-3 py-2 text-sm"
          >
            {child.name}
          </Link>
        ))}
        <Button onClick={() => signOut()}>
          Log out
          <LogOut />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
