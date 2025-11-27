"use client";

import type { Item } from "@/types/item";
import { useMemo } from "react";
import { DraggablePaletteItem } from "./DraggablePaletteItem";

interface ItemsPaletteProps {
  items: Item[];
  selectedItemId?: string | null;
  onSelect: (item: Item) => void;
}

export function ItemsPalette({
  items,
  selectedItemId,
  onSelect,
}: ItemsPaletteProps) {
  const groupedItems = useMemo(() => {
    const groups: Record<string, Item[]> = {};
    
    for (const item of items) {
      const category = item.category ?? "other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    }
    
    return groups;
  }, [items]);

  const categories = Object.keys(groupedItems).sort();

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 md:py-12 text-center">
        <p className="text-sm text-gray-500">No items available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {categories.map((category) => (
        <div key={category} className="space-y-2 md:space-y-3">
          {/* Category label - Luce-style uppercase, small, muted */}
          <h3 className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            {category}
          </h3>
          
          {/* Grid on mobile, flex-wrap on desktop */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:flex md:flex-wrap gap-2 md:gap-3 pb-2">
            {groupedItems[category].map((item) => (
              <DraggablePaletteItem
                key={item.id}
                item={item}
                isSelected={selectedItemId === item.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
