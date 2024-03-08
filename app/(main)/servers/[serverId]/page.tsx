import { getGeneralChannel } from "@/lib/server";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}
const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const channel = await getGeneralChannel(params.serverId);

  if (channel?.name !== "general") return null;

  return redirect(`/servers/${params.serverId}/channels/${channel.id}`);
};

export default ServerIdPage;
