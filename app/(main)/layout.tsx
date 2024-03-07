import { userProfile } from "@/lib/profile";
import SidebarNavigation from "./servers/_components/sidebar-navigation";
import { redirect } from "next/navigation";
import { userServers } from "@/lib/server";
import { Suspense } from "react";
import { SidenavSkeleton } from "@/components/shared/loaders/sidenav-skeleton";

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
        <Suspense fallback={<SidenavSkeleton />}>
          <SidebarNavigation servers={servers} />
        </Suspense>
      </div>
      <main className="md:pl-[80px] h-full">{children}</main>
    </div>
  );
}
