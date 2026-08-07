import { cn } from "../../utils/cn";

export const Skeleton = ({ className }) => (
  <div className={cn("skeleton", className)} />
);

export const DocumentCardSkeleton = () => (
  <div className="glass-card p-5">
    <div className="flex gap-4">
      <Skeleton className="h-12 w-12 shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  </div>
);

export const DocumentListSkeleton = ({ count = 4 }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <DocumentCardSkeleton key={i} />
    ))}
  </div>
);

export const ChatSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-end">
      <Skeleton className="h-16 w-2/3 max-w-md rounded-2xl" />
    </div>
    <div className="flex justify-start">
      <Skeleton className="h-24 w-3/4 max-w-lg rounded-2xl" />
    </div>
    <div className="flex justify-end">
      <Skeleton className="h-12 w-1/2 max-w-sm rounded-2xl" />
    </div>
  </div>
);

export default Skeleton;
