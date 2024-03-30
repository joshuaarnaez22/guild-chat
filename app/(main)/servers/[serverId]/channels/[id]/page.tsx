import React from "react";
import ChatHeader from "@/components/shared/chat/chat-header";
import { getChannel } from "@/lib/channel";
import { getMember } from "@/lib/member";
import { signedInProfile } from "@/lib/profile";
import { redirect } from "next/navigation";
import ChatInput from "@/components/shared/chat/chat-input";
import ChatMessages from "@/components/shared/chat/chat-messages";

interface ChannelsIdPageProps {
  params: {
    id: string;
    serverId: string;
  };
}
const ChannelsIdPage = async ({ params }: ChannelsIdPageProps) => {
  const user = await signedInProfile();
  if (!user) {
    redirect("/");
  }
  const [channel, member] = await Promise.all([
    getChannel(params.id),
    getMember(user.id, params.serverId),
  ]);

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className=" bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        type="channel"
        serverId={params.serverId}
      />
      <ChatMessages
        name={channel.name}
        member={member}
        chatId={channel.id}
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
        type="channel"
      />
      <ChatInput
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        type="channel"
        name={channel.name}
      />
    </div>
  );
};

export default ChannelsIdPage;
