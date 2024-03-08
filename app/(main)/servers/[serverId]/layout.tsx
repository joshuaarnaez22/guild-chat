import ServerSideBar from "@/components/shared/server/server-sidebar";
import { userProfile } from "@/lib/profile";
import { getServerById } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function ServerIdLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}>) {
  const profile = await userProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await getServerById(params.serverId, profile.id);
  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col w-60 fixed inset-y-0 h-full ">
        <ServerSideBar serverId={params.serverId} />
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </div>
  );
}
