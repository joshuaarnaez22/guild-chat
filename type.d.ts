import { Channel, Server, Member, Profile } from "@prisma/client";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiResponse } from "next";

export type ServerWithMembersWithChannels = Server & {
  channels: Channel[];
  members: (Member & { profile: Profile })[];
};

export interface ServerPayload {
  imageUrl: string;
  name: string;
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
