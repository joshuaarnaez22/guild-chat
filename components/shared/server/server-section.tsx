"use client";
import React from "react";
import ActionToolTip from "@/components/shared/action-tooltip";
import { useModal } from "@/store/use-modal-store";
import { ServerWithMembersWithChannels } from "@/type";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

interface ServerSectionprops {
  channelType?: ChannelType;
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  server?: ServerWithMembersWithChannels;
}
const ServerSection = ({
  channelType,
  label,
  role,
  sectionType,
  server,
}: ServerSectionprops) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-[12px] uppercase font-bold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionToolTip label="Create channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className=" text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionToolTip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionToolTip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className=" text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionToolTip>
      )}
    </div>
  );
};

export default ServerSection;
