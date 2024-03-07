import { Skeleton } from "@/components/ui/skeleton";

export const SidenavSkeleton = () => {
  return (
    <div className="py-3">
      <Skeleton className="mx-3 h-[48px] w-[48px] " />
    </div>
  );
};
