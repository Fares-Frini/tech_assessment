"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, ImagePlus, SwitchCamera } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

type FacingMode = "user" | "environment";

type CameraLiveViewProps = {
  onCapture: (imageDataUrl: string) => void;
  onPermissionError: () => void;
};

export function CameraLiveView({ onCapture, onPermissionError }: CameraLiveViewProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [isLoading, setIsLoading] = useState(true);

  const videoConstraints: MediaTrackConstraints = {
    facingMode,
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    aspectRatio: { ideal: 16 / 9 },
  };

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [onCapture]);

  const handleToggleCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  const handleUserMedia = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleUserMediaError = useCallback(() => {
    setIsLoading(false);
    onPermissionError();
  }, [onPermissionError]);

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
            onCapture(dataUrl);
          }
        };
        reader.readAsDataURL(file);
      }
      event.target.value = "";
    },
    [onCapture]
  );

  return (
    <div className="flex min-h-[250px] md:min-h-[400px] flex-col items-center justify-center px-2 sm:px-6">
      <Card className="w-full max-w-lg overflow-hidden border-black/10 p-0">
        {/* Camera feed container - 16:9 on mobile, 4:3 on desktop */}
        <div className="relative aspect-video md:aspect-4/3 w-full bg-black">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="mx-auto mb-3 h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <p className="text-xs sm:text-sm text-white/70">Starting camera...</p>
              </div>
            </div>
          )}

          {/* Webcam */}
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            mirrored={facingMode === "user"}
            className="h-full w-full object-cover"
          />

          {/* Teeth/mouth guide overlay - wider for 16:9 on mobile */}
          {!isLoading && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-20 w-44 sm:h-32 sm:w-48">
                {/* Ellipse guide for mouth area */}
                <div className="absolute inset-0 rounded-[50%] border-2 border-dashed border-white/40" />
                {/* Helper text */}
                <p className="absolute -bottom-5 sm:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs text-white/60">
                  Position your smile here
                </p>
              </div>
            </div>
          )}

          {/* Camera toggle button */}
          {!isLoading && (
            <button
              onClick={handleToggleCamera}
              className="absolute right-2 top-2 sm:right-3 sm:top-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 active:scale-95"
              aria-label="Switch camera"
            >
              <SwitchCamera className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>

        {/* Capture and Import buttons */}
        <div className="p-3 sm:p-4 space-y-2">
          <Button
            onClick={handleCapture}
            disabled={isLoading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 active:scale-[0.98] text-sm sm:text-base"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Photo
          </Button>
          <Button
            onClick={handleImportClick}
            variant="outline"
            className="w-full border-violet-200 text-violet-600 hover:bg-violet-50 active:scale-[0.98] text-sm sm:text-base"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Import from Gallery
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </Card>

      {/* Instructions */}
      <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-gray-400">
        Take a photo of your teeth for the jewelry preview
      </p>
    </div>
  );
}
