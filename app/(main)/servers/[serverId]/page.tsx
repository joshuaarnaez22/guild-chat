import { signedInProfile } from "@/lib/profile";
import { getGeneralChannel } from "@/lib/server";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}
const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const user = await signedInProfile();
  if (!user) {
    redirect("/");
  }
  const channel = await getGeneralChannel(user.id, params.serverId);

  if (channel?.name !== "general") return null;

  return redirect(`/servers/${params.serverId}/channels/${channel.id}`);
};

export default ServerIdPage;
