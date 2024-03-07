"use server";
import { prisma } from "@/lib/prisma";
import { signedInProfile } from "@/lib/profile";
import { ServerPayload } from "@/type";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

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

  const server = await prisma.server.update({
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
