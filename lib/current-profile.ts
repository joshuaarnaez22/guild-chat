import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { prisma } from "./prisma";

export const currentProfile = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }
  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
