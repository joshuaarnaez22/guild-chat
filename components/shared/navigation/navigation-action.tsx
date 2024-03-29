"use client";
import React from "react";
import { Plus } from "lucide-react";
import ActionToolTip from "@/components/shared/action-tooltip";
import { useModal } from "@/store/use-modal-store";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionToolTip side="right" label="Add a server" align="center">
        <button
          className=" group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className=" flex mx-3 h-[48px] w-[48px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className=" group-hover:text-white transition text-emerald-500" />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};

export default NavigationAction;
