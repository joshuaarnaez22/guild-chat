import { getServerDataById } from "@/lib/server";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import ServerSearch from "./server-search";

interface ServerSideBarProps {
  serverId: string;
  profileId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldCheck className=" text-indigo-500 mr-2 w-4 h-4" />,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className=" text-rose-500 mr-2 w-4 h-4" />
  ),
};

const ServerSideBar = async ({ serverId, profileId }: ServerSideBarProps) => {
  const server = await getServerDataById(serverId);
  if (!server) {
    return redirect("/");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server.members.filter(
    (member) => member.profileId !== profileId
  );

  const role = server.members.find(
    (member) => member.profileId === profileId
  )?.role;

  return (
    <div className="h-full flex flex-col text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role!} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-3">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels.map((audio) => ({
                  id: audio.id,
                  name: audio.name,
                  icon: iconMap[audio.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels.map((video) => ({
                  id: video.id,
                  name: video.name,
                  icon: iconMap[video.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  email: member.profile.email,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
