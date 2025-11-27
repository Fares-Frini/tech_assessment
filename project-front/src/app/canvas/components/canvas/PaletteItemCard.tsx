"use client";

import { cn } from "@/lib/utils";
import type { Item } from "@/types/item";
import { getItemImageUrl } from "@/types/item";
import Image from "next/image";

interface PaletteItemCardProps {
  item: Item;
  isSelected: boolean;
  onClick: () => void;
}

export function PaletteItemCard({
  item,
  isSelected,
  onClick,
}: PaletteItemCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center",
        "rounded-2xl border bg-white transition-all duration-200",
        "hover:shadow-md hover:border-violet-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2",
        isSelected
          ? "border-violet-500 shadow-md ring-2 ring-violet-500/20"
          : "border-gray-100 shadow-sm"
      )}
    >
      <div className="relative h-14 w-14">
        <Image
          src={getItemImageUrl(item)}
          alt={item.name}
          fill
          className="object-contain pointer-events-none select-none"
          draggable={false}
          sizes="56px"
        />
      </div>
      
      {/* Tooltip on hover */}
      <div
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
          "rounded-md bg-gray-900 px-2 py-1 text-xs text-white",
          "opacity-0 transition-opacity group-hover:opacity-100",
          "pointer-events-none z-10"
        )}
      >
        {item.name}
      </div>
    </button>
  );
}
