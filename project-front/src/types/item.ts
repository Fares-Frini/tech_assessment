export type Item = {
  id: string;
  name: string;
  imagePath?: string | null;
  imageMime?: string | null;
  defaultSize: number;
  category?: string | null;
  createdAt: string;
};

export function getItemImageUrl(item: Item | string): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4050';
  
  if (typeof item === 'object' && item.imagePath) {
    return `${apiUrl}/uploads/${item.imagePath}`;
  }
  
  const itemId = typeof item === 'string' ? item : item.id;
  return `${apiUrl}/items/${itemId}/image`;
}
