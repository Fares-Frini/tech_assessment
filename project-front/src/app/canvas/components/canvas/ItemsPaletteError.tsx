"use client";

import { Button } from "@/components/ui/button";

interface ItemsPaletteErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function ItemsPaletteError({
  message = "Unable to load items",
  onRetry,
}: ItemsPaletteErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-4xl">✕</div>
      <h3 className="mb-2 text-sm font-medium text-gray-900">
        Something went wrong
      </h3>
      <p className="mb-4 text-xs text-gray-500 max-w-[200px]">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="text-xs"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
