"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ImageCropper } from "./ImageCropper";

type CameraCropViewProps = {
  imageSrc: string;
  onCropComplete: (croppedImageDataUrl: string) => void;
  onRetake: () => void;
};

export function CameraCropView({
  imageSrc,
  onCropComplete,
  onRetake,
}: CameraCropViewProps) {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  
  useEffect(() => {
    const updateAspectRatio = () => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        setAspectRatio(16 / 9);
      } else {
        const viewportHeight = window.innerHeight;
        const headerHeight = 120;
        const padding = 48;
        const availableHeight = Math.max(520, viewportHeight - headerHeight - padding);
        
        const availableWidth = window.innerWidth - 320 - 24 - 48;
        
        const calculatedRatio = availableWidth / availableHeight;
        
        const clampedRatio = Math.max(4/3, Math.min(21/9, calculatedRatio));
        setAspectRatio(clampedRatio);
      }
    };
    
    updateAspectRatio();
    window.addEventListener('resize', updateAspectRatio);
    return () => window.removeEventListener('resize', updateAspectRatio);
  }, []);

  return (
    <div className="flex min-h-[250px] md:min-h-[400px] flex-col items-center justify-center px-2 sm:px-6">
      <Card className="w-full max-w-lg overflow-hidden border-black/10 p-0 h-[350px] sm:h-[480px]">
        <ImageCropper
          imageSrc={imageSrc}
          onCropComplete={onCropComplete}
          onCancel={onRetake}
          aspectRatio={aspectRatio}
        />
      </Card>

      {/* Instructions */}
      <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-gray-400">
        Adjust the crop area to focus on your smile
      </p>
    </div>
  );
}
