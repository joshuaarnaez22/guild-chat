import { prisma } from "./prisma";

export const getChannel = async (channelId: string) => {
  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  return channel;
};
