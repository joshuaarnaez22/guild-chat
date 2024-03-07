import { currentUser } from "@clerk/nextjs";
import { prisma } from "./prisma";
import { signedInProfile } from "./profile";

export const userServer = async (id: string) => {
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: id,
        },
      },
    },
  });

  return server;
};

export const userServers = async (id: string) => {
  const server = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: id,
        },
      },
    },
  });

  return server;
};

export const getServerById = async (serverId: string, profileId: string) => {
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profileId,
        },
      },
    },
  });

  return server;
};

export const getServerDataById = async (serverId: string) => {
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  return server;
};
