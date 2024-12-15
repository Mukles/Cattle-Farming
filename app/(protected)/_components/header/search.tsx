"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialog } from "@/hooks/use-dialog";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search as SearchIcon,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { useEffect } from "react";

export default function Search() {
  const { isOpen, onOpenChange } = useDialog();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="relative flex items-center md:hidden ml-auto">
        <Button
          onClick={() => onOpenChange(true)}
          className="rounded-full border border-border bg-transparent "
          variant={"outline"}
          size={"icon"}
        >
          <SearchIcon className="w-5 h-5 md:hidden" />
        </Button>
      </div>

      <div className="flex flex-1 relative  max-w-[430px] max-md:hidden">
        <Label
          className="absolute top-0 left-2 px-2 h-11 inline-flex items-center justify-center text-muted-foreground"
          htmlFor="search"
        >
          <SearchIcon className="w-5 h-5" />
        </Label>
        <Input
          className="pl-11 h-11"
          id="search"
          type="search"
          placeholder="Search or type command..."
          onFocus={() => onOpenChange(true)}
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground text-xs font-medium tracking-[3px] border border-input w-10 h-7 font-secondary rounded-md">
          ⌘K
        </span>
      </div>

      <CommandDialog open={isOpen} onOpenChange={onOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
