import { Skeleton } from "@/components/ui/skeleton";

export const SidenavSkeleton = () => {
  return (
    <div className=" h-full flex flex-col py-3 space-y-2 bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <div className="flex-1 space-y-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            className="mx-3 h-[48px] w-[48px] bg-[#b1b2b4] dark:bg-[#5e6168] rounded-md"
            key={index}
          />
        ))}
      </div>
      <div>
        <Skeleton className="mx-3 h-[48px] w-[48px] rounded-full bg-[#b1b2b4] dark:bg-[#5e6168]" />
      </div>
    </div>
  );
};
