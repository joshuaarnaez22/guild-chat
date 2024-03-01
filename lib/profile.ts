import { currentUser, redirectToSignIn, auth } from "@clerk/nextjs";
import { prisma } from "./prisma";

export const userProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};

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

export const signedInProfile = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }
  const profile = await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  return profile;
};
