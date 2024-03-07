import { Channel, Server, Member, Profile } from "@prisma/client";

export type ServerWithMembersWithChannels = Server & {
  channels: Channel[];
  members: (Member & { profile: Profile })[];
};

export interface ServerPayload {
  imageUrl: string;
  name: string;
}
