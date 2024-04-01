import { currentProfile } from "@/lib/current-profile";
import { NextApiResponseServerIo } from "@/type";
import { NextApiRequest } from "next";
import { prisma } from "@/lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }
  try {
    const profile = await currentProfile(req);
    const { serverId, channelId } = req.query;
    const { content, fileUrl } = req.body;
    if (!profile) {
      return res.status(404).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(404).json({ error: "Server id is missing" });
    }

    if (!channelId) {
      return res.status(404).json({ error: "Channel id is missing" });
    }
    if (!content) {
      return res.status(404).json({ error: "Content is missing" });
    }
    const server = await prisma.server.findUnique({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: {
          where: {
            profileId: profile.id,
          },
        },
      },
    });
    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const channel = await prisma.channel.findUnique({
      where: {
        id: channelId as string,
        serverId: server.id,
      },
    });
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    const isMember = server.members.find(
      (member) => profile.id === member.profileId
    );

    if (!isMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        fileUrl,
        memberId: isMember.id,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(message, channelKey);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({});
  }
}
