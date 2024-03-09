"use server";
import { prisma } from "@/lib/prisma";
import { signedInProfile } from "@/lib/profile";
import { MemberRole } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateMemberRole = async (
  role: string,
  memberId: string,
  serverId: string
) => {
  const user = await signedInProfile();
  if (!user) {
    redirect("/");
  }
  const server = await prisma.server.update({
    where: {
      id: serverId,
      profileId: user.id,
    },
    data: {
      members: {
        update: {
          where: {
            id: memberId,
            profileId: {
              not: user.id,
            },
          },
          data: {
            role:
              role === MemberRole.GUEST
                ? MemberRole.GUEST
                : MemberRole.MODERATOR,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  revalidateTag(`/servers/${server.id}`);
  return server;
};

export const kickMemberfromServer = async (
  memberId: string,
  serverId: string
) => {
  const user = await signedInProfile();
  if (!user) {
    redirect("/");
  }
  const server = await prisma.server.update({
    where: {
      id: serverId,
      profileId: user.id,
    },
    data: {
      members: {
        delete: {
          id: memberId,
          profileId: {
            not: user.id,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  revalidateTag(`/servers/${server.id}`);
  return server;
};
