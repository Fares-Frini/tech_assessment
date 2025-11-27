"use client";

import { apiGet } from "@/lib/api";
import type { Item } from "@/types/item";
import { useQuery } from "@tanstack/react-query";

export function useItemsQuery() {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => apiGet<Item[]>("/items"),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
