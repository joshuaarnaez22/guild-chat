"use server";
import { prisma } from "@/lib/prisma";
import { signedInProfile } from "@/lib/profile";
import { ServerPayload } from "@/type";
import { redirectToSignIn } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const createServer = async ({ name, imageUrl }: ServerPayload) => {
  try {
    const user = await signedInProfile();

    await prisma.server.create({
      data: {
        profileId: user.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: user.id }],
        },
        members: {
          create: [{ profileId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });
    revalidateTag("/");
    return;
  } catch (error) {
    console.log("[SOMETHING_WENT_WRONG] - server.ts(createServer)", error);
  }
};

export const updateInviteLink = async (serverId: string) => {
  try {
    const user = await signedInProfile();

    if (!user) {
      return redirectToSignIn();
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return server;
  } catch (error) {
    console.log("[SOMETHING_WENT_WRONG] - server.ts(updateInviteLink)", error);
  }
};

export const leaveServer = async (serverId: string) => {
  const user = await signedInProfile();

  const member = await prisma.server.findFirst({
    where: {
      id: serverId,
    },
    select: {
      members: {
        where: {
          profileId: user.id,
        },
      },
    },
  });

  if (!member) {
    return redirect("/");
  }
  await prisma.member.delete({
    where: {
      id: member.members[0].id,
    },
  });
  return redirect("/");
};

export const serverExist = async (inviteCode: string) => {
  const user = await signedInProfile();

  if (!user) {
    return redirectToSignIn();
  }
  const server = await prisma.server.findUnique({
    where: {
      inviteCode,
    },
  });

  if (!server) {
    return notFound();
  }

  const isUserMember = await prisma.server.findUnique({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: user.id,
        },
      },
    },
  });

  if (isUserMember) {
    return redirect(`/servers/${server.id}`);
  }

  const joinedServer = await prisma.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: user.id }],
      },
    },
  });

  if (joinedServer) {
    return redirect(`/servers/${joinedServer.id}`);
  }
};

export const updateServer = async (values: ServerPayload, serverId: string) => {
  const user = await signedInProfile();

  if (!user) {
    return redirectToSignIn();
  }

  const server = await prisma.server.update({
    where: {
      id: serverId,
      profileId: user.id,
    },
    data: {
      name: values.name,
      imageUrl: values.imageUrl,
    },
  });

  revalidateTag(`/servers/${server.id}`);
};

export const deleteServer = async (serverId: string) => {
  const user = await signedInProfile();

  await prisma.server.delete({
    where: {
      id: serverId,
      profileId: user.id,
    },
  });

  revalidateTag(`/`);
};
