"use client";

import { cn } from "@/lib/utils";
import type { Item } from "@/types/item";
import { getItemImageUrl } from "@/types/item";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";

type MobileHorizontalPaletteProps = {
  items: Item[];
  selectedItemId?: string | null;
  onSelect: (item: Item) => void;
};

type MobileDraggableItemProps = {
  item: Item;
  isSelected?: boolean;
  onSelect: (item: Item) => void;
};

function MobileDraggableItem({
  item,
  isSelected = false,
  onSelect,
}: MobileDraggableItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `mobile-${item.id}`,
    data: { item },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(item)}
      className={cn(
        "relative flex h-14 w-14 shrink-0 cursor-grab items-center justify-center touch-none",
        "rounded-xl border bg-white transition-all duration-200",
        "active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
        isSelected
          ? "border-violet-500 shadow-md ring-2 ring-violet-500/20"
          : "border-gray-100 shadow-sm",
        isDragging && "opacity-30"
      )}
    >
      <div className="relative h-10 w-10">
        <Image
          src={getItemImageUrl(item)}
          alt={item.name}
          fill
          className="object-contain pointer-events-none select-none"
          draggable={false}
          sizes="40px"
        />
      </div>
    </button>
  );
}

export function MobileHorizontalPalette({
  items,
  selectedItemId,
  onSelect,
}: MobileHorizontalPaletteProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-2">
        <p className="text-xs text-gray-500">No items available</p>
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <MobileDraggableItem
          key={item.id}
          item={item}
          isSelected={selectedItemId === item.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
