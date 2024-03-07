"use client";
import React, { useTransition } from "react";
import { ServerWithMembersWithChannels } from "@/type";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/store/use-modal-store";
import { leaveServer } from "@/actions/server";
import toast from "react-hot-toast";

interface ServerHeaderProps {
  server: ServerWithMembersWithChannels;
  role: string;
}
const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const [, startTransition] = useTransition();
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" focus:outline-none" asChild>
        <button className=" flex w-full text-[16px] font-semibold px-3 capitalize items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-1">
        {isModerator && (
          <>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("invite", { server })}
            >
              Invite People
              <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("createChannel")}
            >
              Create Channel
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("editServer", { server })}
            >
              Server Settings
              <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("members", { server })}
            >
              Manage Members
              <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            className=" text-red-500 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("deleteServer", { server })}
          >
            {" "}
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave server <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
