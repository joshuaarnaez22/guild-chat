import { userProfile, userServers } from "@/lib/profile";
import SidebarNavigation from "./server/_components/sidebar-navigation";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await userProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await userServers(profile.id);

  if (!servers.length) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex z-30 flex-col w-[80px] fixed inset-y-0 h-full ">
        <SidebarNavigation servers={servers} />
      </div>
      <main className="md:pl-[80px] h-full">{children}</main>
    </div>
  );
}
