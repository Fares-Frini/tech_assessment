"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Check, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";

export type CroppedAreaPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ImageCropperProps = {
  imageSrc: string;
  onCropComplete: (croppedImageDataUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
};

async function getCroppedImage(
  imageSrc: string,
  pixelCrop: CroppedAreaPixels
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.95);
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

export function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  aspectRatio = 4 / 3,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = useCallback((newCrop: Point) => {
    setCrop(newCrop);
  }, []);

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const onCropAreaComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleConfirmCrop = useCallback(async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Crop area */}
      <div className="relative flex-1 min-h-[200px] sm:min-h-[300px] bg-gray-900">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropAreaComplete}
          cropShape="rect"
          showGrid={true}
          classes={{
            containerClassName: "!absolute !inset-0",
            cropAreaClassName: "!border-violet-500 !border-2",
          }}
        />
      </div>

      {/* Zoom controls */}
      <div className="bg-gray-900 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleZoomOut}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(values: number[]) => setZoom(values[0])}
            className="flex-1"
          />
          
          <button
            onClick={handleZoomIn}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
        
        <p className="mt-1.5 sm:mt-2 text-center text-[10px] sm:text-xs text-white/60">
          Drag to reposition · Pinch or use slider to zoom
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 sm:gap-3 bg-white p-3 sm:p-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 border-black/10 text-sm sm:text-base active:scale-[0.98]"
        >
          <RotateCcw className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Retake
        </Button>
        <Button
          onClick={handleConfirmCrop}
          disabled={isProcessing || !croppedAreaPixels}
          className="flex-1 bg-violet-600 hover:bg-violet-700 text-sm sm:text-base active:scale-[0.98]"
        >
          {isProcessing ? (
            <div className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Check className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
          {isProcessing ? "Processing..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
}
