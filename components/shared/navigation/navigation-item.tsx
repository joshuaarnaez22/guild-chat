"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import ActionToolTip from "@/components/shared/action-tooltip";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  name: string;
  imageUrl: string;
  id: string;
}
const NavigationItem = ({ name, id, imageUrl }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();

  const handleClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionToolTip side="right" align="center" label={name}>
      <button
        className=" group relative flex items-center"
        onClick={handleClick}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && " group-hover:h-[24px]",
            params?.serverId === id ? " h-[36px]" : "h-[12px]"
          )}
        />
        <div
          className={cn(
            " relative flex mx-3 h-[48px] w-[48px] group-hover:rounded-[16px] transition-all overflow-hidden rounded-sm",
            params?.serverId === id && " rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
