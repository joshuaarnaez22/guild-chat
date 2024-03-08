import ChatHeader from "@/components/shared/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { getMember } from "@/lib/member";
import { signedInProfile } from "@/lib/profile";
import { redirect } from "next/navigation";
import React from "react";

interface ConversationsIdPageProps {
  params: {
    serverId: string;
    id: string;
  };
}
const ConversationsIdPage = async ({ params }: ConversationsIdPageProps) => {
  const user = await signedInProfile();

  const currentMember = await getMember(user.id, params.serverId);

  if (!currentMember) {
    redirect("/");
  }
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.id
  );

  const { memberOne, memberTwo } = conversation;
  const otherMember = memberOne.profileId === user.id ? memberTwo : memberOne;

  return (
    <div className="h-full bg-white dark:bg-[#313338] flex flex-col">
      <ChatHeader
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
};

export default ConversationsIdPage;
