import React from "react";
import { Hash } from "lucide-react";
import MobileToogle from "../mobile-toogle";
import UserAvatar from "../user-avatar";
import { UserButton } from "@clerk/nextjs";
import SocketStatus from "../socket-status";

interface ChatHeaderProps {
  name: string;
  type: "channel" | "conversation";
  serverId: string;
  imageUrl?: string;
}
const ChatHeader = ({ name, type, serverId, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="h-12 text-[16px] font-semibold px-3 flex items-center justify-between border-neutral-200 dark:border-neutral-800 border-b-2 z-20">
      <div className="flex items-center">
        <MobileToogle serverId={serverId} />
        {type === "channel" && (
          <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
        )}
        {type === "conversation" && (
          <UserAvatar
            src={imageUrl}
            className="w-8 h-8 md:h-8 md:w-8 text-zinc-500 dark:text-zinc-400 mr-2"
          />
        )}
        <p className=" font-semibold text-[16px] text-black dark:text-white">
          {name}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <SocketStatus />
        <div className="block md:hidden ">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
