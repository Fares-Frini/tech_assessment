"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ImagePlus } from "lucide-react";
import { useCallback, useRef } from "react";

type CameraPermissionErrorProps = {
  onRetry: () => void;
  onImport: (imageDataUrl: string) => void;
};

export function CameraPermissionError({ onRetry, onImport }: CameraPermissionErrorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          if (dataUrl) {
            onImport(dataUrl);
          }
        };
        reader.readAsDataURL(file);
      }
      event.target.value = "";
    },
    [onImport]
  );

  return (
    <div className="flex min-h-[300px] md:min-h-[400px] flex-col items-center justify-center px-3 sm:px-6">
      <Card className="w-full max-w-md border-black/10 p-6 sm:p-8 text-center">
        <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
        </div>
        <h2 className="mb-1.5 sm:mb-2 text-base sm:text-lg font-medium text-gray-900">
          Camera Access Required
        </h2>
        <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500">
          Please allow camera access in your browser settings to capture your smile photo, or import a photo from your gallery.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleImportClick}
            className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98]"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Import from Gallery
          </Button>
          <Button
            variant="outline"
            onClick={onRetry}
            className="w-full border-black/10 active:scale-[0.98]"
          >
            Try Again
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </Card>
    </div>
  );
}
