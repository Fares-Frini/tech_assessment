"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ItemsPaletteSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton for 2 category sections */}
      {[1, 2].map((section) => (
        <div key={section} className="space-y-3">
          {/* Category label skeleton */}
          <Skeleton className="h-3 w-16" />
          
          {/* Items row skeleton */}
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                className="h-20 w-20 shrink-0 rounded-2xl"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
