import React from "react";
import { UserButton } from "@clerk/nextjs";

import { Server } from "@prisma/client";
import NavigationAction from "./navigation-action";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "@/components/shared/mode-toogle";

interface SidebarNavigationProps {
  servers: Server[];
}

const SidebarNavigation = ({ servers }: SidebarNavigationProps) => {
  return (
    <div className=" space-y-4 flex flex-col h-full items-center w-full text-primary dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto w-10" />
      <ScrollArea className="flex-1 h-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto pb-3 flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
