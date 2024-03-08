import { prisma } from "./prisma";

export const getMember = async (memberId: string, serverId: string) => {
  const member = await prisma.member.findFirst({
    where: {
      profileId: memberId,
      serverId: serverId,
    },
    include: {
      profile: true,
    },
  });
  return member;
};
