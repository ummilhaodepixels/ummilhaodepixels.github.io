"use client";

import { Building2, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Marcas",
    url: "/brands/new",
    icon: Building2,
    isActive: true,
    submenu: [
      {
        title: "Novo",
        url: "/brands/new",
      },
    ],
  },
];

export default function AppSidebar() {
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={cn("border-b-1 justify-center h-[--header-height]", {
          "p-0": state === "collapsed",
        })}
      >
        {state === "expanded" || isMobile ? (
          <Image
            src="/logo.png"
            width={180}
            height={50}
            alt="logo"
            priority
            className="w-44 h-12"
          />
        ) : (
          <Image src="/icon.png" width={50} height={50} alt="logo" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <Collapsible
                    asChild
                    key={item.title}
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem key={item.title}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu?.map((submenu) => (
                            <SidebarMenuSubItem
                              key={`${item.title} - ${submenu.title}`}
                            >
                              <SidebarMenuSubButton asChild>
                                <Link href={submenu.url}>
                                  <span>{submenu.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
