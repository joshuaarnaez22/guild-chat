import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="h-full bg-white dark:bg-[#313338] flex flex-col">
        <Skeleton className="h-12 text-[16px] font-semibold px-3 flex items-center justify-between border-neutral-200 dark:border-neutral-800 border-b-2 z-20" />
    </div>
  }