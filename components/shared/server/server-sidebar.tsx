import { getServerDataById } from "@/lib/server";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Mic, ShieldAlert, ShieldCheck, User, Video } from "lucide-react";
import ServerSearch from "./server-search";
import { Separator } from "@/components/ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";
import { userProfile } from "@/lib/profile";

interface ServerSideBarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: <User className="text-blue-500 w-4 h-4 mr-2" />,
  [MemberRole.ADMIN]: <ShieldCheck className=" text-indigo-500 mr-2 w-4 h-4" />,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className=" text-rose-500 mr-2 w-4 h-4" />
  ),
};

const ServerSideBar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await userProfile();

  if (!profile) {
    return redirect("/");
  }

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
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
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
        <Separator className="bg-zinc-200 dark:bg-zinc-700  my-2" />
        {!!textChannels.length && (
          <div className=" mb-2">
            <ServerSection
              channelType={ChannelType.TEXT}
              label="Text Channels"
              role={role}
              sectionType="channels"
            />
            <div className="space-y-1">
              {textChannels.map((textChannel) => (
                <ServerChannel
                  key={textChannel.id}
                  server={server}
                  channel={textChannel}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels.length && (
          <div className=" mb-2">
            <ServerSection
              channelType={ChannelType.AUDIO}
              label="Voice Channels"
              role={role}
              sectionType="channels"
            />
            <div className="space-y-1">
              {audioChannels.map((audioChannel) => (
                <ServerChannel
                  key={audioChannel.id}
                  server={server}
                  channel={audioChannel}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels.length && (
          <div className=" mb-2">
            <ServerSection
              channelType={ChannelType.VIDEO}
              label="Video Channels"
              role={role}
              sectionType="channels"
            />
            <div className="space-y-1">
              {videoChannels.map((videoChannel) => (
                <ServerChannel
                  key={videoChannel.id}
                  server={server}
                  channel={videoChannel}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!members.length && (
          <div className=" mb-2">
            <ServerSection
              label="Members"
              sectionType="members"
              server={server}
              role={role}
            />
            <div className="space-y-1">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
