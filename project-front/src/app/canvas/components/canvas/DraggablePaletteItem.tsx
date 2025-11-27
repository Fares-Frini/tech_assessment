"use client";

import { cn } from "@/lib/utils";
import type { Item } from "@/types/item";
import { getItemImageUrl } from "@/types/item";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";

type DraggablePaletteItemProps = {
  item: Item;
  isSelected?: boolean;
  onSelect: (item: Item) => void;
};

export function DraggablePaletteItem({
  item,
  isSelected = false,
  onSelect,
}: DraggablePaletteItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } =
    useDraggable({
      id: item.id,
      data: { item },
    });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(item)}
      className={cn(
        "group relative flex h-16 w-16 md:h-20 md:w-20 shrink-0 cursor-grab items-center justify-center touch-none",
        "rounded-xl md:rounded-2xl border bg-white transition-all duration-200",
        "hover:shadow-md hover:border-violet-200",
        "active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2",
        isSelected
          ? "border-violet-500 shadow-md ring-2 ring-violet-500/20"
          : "border-gray-100 shadow-sm",
        isDragging && "opacity-0"
      )}
    >
      <div className="relative h-10 w-10 md:h-14 md:w-14">
        <Image
          src={getItemImageUrl(item)}
          alt={item.name}
          fill
          className="object-contain pointer-events-none select-none"
          draggable={false}
          sizes="(max-width: 768px) 40px, 56px"
        />
      </div>

      {/* Tooltip on hover - hidden on mobile and while dragging */}
      {!isDragging && (
        <div
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
            "rounded-md bg-gray-900 px-2 py-1 text-xs text-white",
            "opacity-0 transition-opacity",
            "hidden md:group-hover:block md:group-hover:opacity-100",
            "pointer-events-none z-10"
          )}
        >
          {item.name}
        </div>
      )}
    </button>
  );
}
