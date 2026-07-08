import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-gradient-to-r from-[#e8e0d4]/60 via-[#f5efe5] to-[#e8e0d4]/60 bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
};

// Pre-built skeleton patterns for common cards

export const DoctorCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8e0d4]/50">
      <div className="flex gap-4">
        {/* Photo */}
        <Skeleton className="w-20 h-20 rounded-2xl shrink-0" />
        {/* Info */}
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-5 w-3/4 rounded-lg" />
          <Skeleton className="h-3.5 w-1/2 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-12 rounded-full" />
            <Skeleton className="h-3 w-16 rounded-full" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[#e8e0d4]/50 flex items-center justify-between">
        <Skeleton className="h-6 w-24 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const TeamCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#e8e0d4]/30">
      <Skeleton className="aspect-[3/4] sm:aspect-square w-full rounded-none" />
    </div>
  );
};

export const ProgramCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e8e0d4]/50">
      <Skeleton className="w-14 h-14 rounded-2xl mb-4" />
      <Skeleton className="h-5 w-2/3 rounded-lg mb-3" />
      <Skeleton className="h-3 w-full rounded-lg mb-2" />
      <Skeleton className="h-3 w-5/6 rounded-lg mb-2" />
      <Skeleton className="h-3 w-4/6 rounded-lg" />
    </div>
  );
};
