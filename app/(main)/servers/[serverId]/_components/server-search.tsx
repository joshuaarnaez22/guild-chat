"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          id: string;
          name: string;
          icon: React.ReactNode;
          email?: string;
        }[]
      | undefined;
  }[];
}
const ServerSearch = ({ data }: ServerSearchProps) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handelSelect = ({
    id,
    type,
  }: {
    id: string;
    type: "member" | "channel";
  }) => {
    setOpen(false);
    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }
    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className=" w-full group p-2 rounded-md flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p>Search</p>
        <kbd className="ml-auto flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ label, type, data: channelData }) => {
            if (!channelData?.length) return null;

            return (
              <CommandGroup heading={label} key={label}>
                {channelData.map(({ id, name, icon, email }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => handelSelect({ id, type })}
                  >
                    {icon}{" "}
                    <div className="flex flex-col">
                      <span className=" font-semibold">{name}</span>
                      <span className=" text-muted-foreground text-xs">
                        {email}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default ServerSearch;
