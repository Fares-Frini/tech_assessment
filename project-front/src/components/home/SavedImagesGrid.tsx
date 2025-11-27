'use client';

import { ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SavedImage {
  id: string;
  name: string;
  imagePath: string;
  createdAt: string;
}

interface SavedImagesGridProps {
  images: SavedImage[];
  isLoading?: boolean;
}

export function SavedImagesGrid({ images, isLoading }: SavedImagesGridProps) {
  const router = useRouter();

  const handleImageClick = (image: SavedImage) => {
    router.push(`/canvas?savedImage=${image.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">No saved images yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Your creations will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {images.slice(0, 6).map((image) => (
        <button
          key={image.id}
          onClick={() => handleImageClick(image)}
          className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 hover:border-purple-400 transition-all hover:shadow-md"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image.imagePath}`}
            alt={image.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs text-white truncate font-medium">
              {image.name}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
