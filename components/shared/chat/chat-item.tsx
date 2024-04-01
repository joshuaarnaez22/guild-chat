import { Member, MemberRole, Profile } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import React, { useState, useTransition } from "react";
import UserAvatar from "../user-avatar";
import ActionToolTip from "../action-tooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});
const ChatItem = ({
  id,
  content,
  currentMember,
  member,
  timestamp,
  fileUrl,
  deleted,
  isUpdated,
  socketQuery,
  socketUrl,
}: ChatItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = !isPdf && fileUrl;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className=" group flex gap-x-2 items-start w-full">
        <div className=" cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className=" flex flex-col w-full">
          <div className=" flex items-center gap-x-2 mt-2">
            <div className="flex items-center gap-x-2">
              <p className=" font-semibold text-sm hover:underline cursor-pointer">
                {member.profile.name}
              </p>

              <ActionToolTip label={member.role}>
                {roleIconMap[member.role]}
              </ActionToolTip>
            </div>
            <span className=" text-zinc-500 text-xs dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary size-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className=" object-cover"
              />
            </a>
          )}
          {isPdf && (
            <div className=" relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="size-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=" ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                {content}
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300 mt-1",
                deleted && "italic text-zinc-500 text-xs  dark:text-zinc-400"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className=" text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            placeholder="Edit message"
                            {...field}
                            disabled={isPending}
                            className="p-2 bg-zinc-300/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size="sm" variant="primary" disabled={isPending}>
                  Save
                </Button>
              </form>
            </Form>
          )}
          {canDeleteMessage && (
            <div className="hidden p-1 group-hover:flex items-center gap-x-2 absolute -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
              {canEditMessage && (
                <ActionToolTip label="Edit">
                  <Edit
                    onClick={() => setIsEditing(!isEditing)}
                    className=" size-4 cursor-pointer ml-auto text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 transition"
                  />
                </ActionToolTip>
              )}
              <ActionToolTip label="Delete">
                <Trash className=" size-4 cursor-pointer ml-auto text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 transition" />
              </ActionToolTip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
