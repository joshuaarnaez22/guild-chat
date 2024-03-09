"use server";
import { prisma } from "@/lib/prisma";
import { signedInProfile } from "@/lib/profile";
import { ChannelType, MemberRole } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface createChannelPayload {
  name: string;
  type: ChannelType;
  serverId: string;
}

export const createChannel = async ({
  name,
  type,
  serverId,
}: createChannelPayload) => {
  const user = await signedInProfile();

  if (!user) {
    redirect("/");
  }
  await prisma.server.update({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: user.id,
          role: {
            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
          },
        },
      },
    },
    data: {
      channels: {
        create: {
          profileId: user.id,
          name,
          type,
        },
      },
    },
  });

  return revalidateTag("/");
};

export const deleteChannel = async (channelId: string) => {
  const user = await signedInProfile();

  if (!user) {
    redirect("/");
  }
  await prisma.channel.delete({
    where: {
      id: channelId,
      profileId: user.id,
    },
  });

  return revalidateTag("/");
};

export const updateChannel = async ({
  channelId,
  name,
  type,
}: {
  channelId: string;
  name: string;
  type: ChannelType;
}) => {
  const user = await signedInProfile();

  if (!user) {
    redirect("/");
  }
  if (name === "general") {
    throw new Error(`general channel name is invalid`);
  }

  await prisma.channel.update({
    where: {
      id: channelId,
      profileId: user.id,
    },
    data: {
      name,
      type,
    },
  });

  return revalidateTag("/");
};
