import SidebarNavigation from "../../components/shared/navigation/sidebar-navigation";
import { Suspense } from "react";
import { SidenavSkeleton } from "@/components/shared/loaders/sidenav-skeleton";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="hidden md:flex z-30 flex-col w-[80px] fixed inset-y-0 h-full ">
        <Suspense fallback={<SidenavSkeleton />}>
          <SidebarNavigation />
        </Suspense>
      </div>
      <main className="md:pl-[80px] h-full">{children}</main>
    </div>
  );
}
