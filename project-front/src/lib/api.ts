export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
}

export async function apiPost<T>(path: string, body: unknown, token?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
}

export async function apiDelete<T>(path: string, token?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
}

export async function apiGetAuth<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
}

export type PlacedItemData = {
  id: string;
  itemId: string;
  x: number;
  y: number;
  size: number;
  rotation?: number;
};

export type SavedImage = {
  id: string;
  name: string;
  imagePath: string;
  placedItems?: PlacedItemData[] | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export async function saveCanvasImage(
  name: string,
  imageData: string,
  token: string,
  placedItems?: PlacedItemData[]
): Promise<SavedImage> {
  const blob = dataURLtoBlob(imageData);
  const formData = new FormData();
  formData.append('image', blob, 'canvas.png');
  formData.append('name', name);
  if (placedItems && placedItems.length > 0) {
    formData.append('placedItems', JSON.stringify(placedItems));
  }

  const res = await fetch(`${API_URL}/saved-images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to save image');
  }

  return res.json();
}

export async function getSavedImages(token: string): Promise<SavedImage[]> {
  return apiGetAuth<SavedImage[]>("/saved-images", token);
}

export async function deleteSavedImage(id: string, token: string): Promise<void> {
  await apiDelete(`/saved-images/${id}`, token);
}

export function getSavedImageUrl(imagePath: string): string {
  return `${API_URL}/uploads/${imagePath}`;
}
