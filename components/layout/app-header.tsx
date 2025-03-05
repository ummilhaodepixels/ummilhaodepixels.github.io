"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useSidebar } from "../ui/sidebar";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CustomSidebarTrigger = () => {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      variant="neutral"
      size="icon"
      className="p-2 [&_svg]:size-fit"
    >
      {state === "expanded" ? <Menu size={24} /> : <Menu size={24} />}
    </Button>
  );
};

export default function AppHeader() {
  const { user, logout } = useAuth();
  const { state, isMobile } = useSidebar();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 bg-sidebar border-b-1 h-[--header-height] px-4 py-2",
        {
          "ml-[--sidebar-width]": state === "expanded",
          "ml-[--sidebar-width-icon]": state === "collapsed",
          "ml-0": isMobile,
        }
      )}
    >
      <div className="flex h-full items-center justify-between">
        <CustomSidebarTrigger />
        {isMobile && (
          <Image src="/logo.png" width={180} height={50} alt="logo" />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-full w-[40px] h-[40px] bg-slate-300 flex justify-center items-center cursor-pointer">
                <span className="font-bold">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onClick={() => logout()}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
