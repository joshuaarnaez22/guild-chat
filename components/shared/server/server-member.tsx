"use client";
import React from "react";
import { Member, MemberRole, Profile } from "@prisma/client";
import { ShieldAlert, ShieldCheck, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/shared/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
}

const roleIconMap = {
  [MemberRole.GUEST]: <User className="text-blue-500 w-4 h-4 mr-2" />,
  [MemberRole.ADMIN]: <ShieldCheck className=" text-indigo-500 mr-2 w-4 h-4" />,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className=" text-rose-500 mr-2 w-4 h-4" />
  ),
};
const ServerMember = ({ member }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  const handleBtnClick = () => {
    router.push(`/servers/${params.serverId}/conversations/${member.id}`);
  };
  return (
    <button
      onClick={handleBtnClick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params.id === member.id && "bg-zinc-700/20 dark:bg-zinc-700/50"
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="w-8 h-8" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params.id === member.id &&
            "text-primary dark:text-zinc-500 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
