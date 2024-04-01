export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full flex items-center justify-center ">
      <p className=" animate-pulse text-muted-foreground font-semibold">
        Loading please wait...
      </p>
    </div>
  );
}
