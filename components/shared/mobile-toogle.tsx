import React, { Suspense, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import SidebarNavigation from "@/components/shared/navigation/sidebar-navigation";
import ServerSideBar from "./server/server-sidebar";

const MobileToogle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          className="h-6 w-6 mr-2 md:hidden"
          variant="ghost"
          size="icon"
          asChild
        >
          <Menu className="w-5 h-5 p-1" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 flex gap-0 w-fit"
        showClose={false}
      >
        <div className="w-[72px]">
          <SidebarNavigation />
        </div>
        <ServerSideBar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToogle;
