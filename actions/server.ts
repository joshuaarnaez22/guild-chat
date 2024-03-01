"use server";
import { prisma } from "@/lib/prisma";
import { signedInProfile } from "@/lib/profile";
import { MemberRole } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { v4 as uuidv4 } from "uuid";

interface createServerPayload {
  name: string;
  imageUrl: string;
}
export const createServer = async ({ name, imageUrl }: createServerPayload) => {
  try {
    const user = await signedInProfile();

    await prisma.server.create({
      data: {
        profileId: user.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "General", profileId: user.id }],
        },
        members: {
          create: [{ profileId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });
    revalidateTag("/");
    return;
  } catch (error) {
    console.log("[SOMETHING_WENT_WRONG] - server.ts", error);
  }
};
