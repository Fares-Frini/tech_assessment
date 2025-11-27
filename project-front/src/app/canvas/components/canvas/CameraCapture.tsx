"use client";

import { CameraCropView } from "@/app/canvas/components/camera/CameraCropView";
import { CameraLiveView } from "@/app/canvas/components/camera/CameraLiveView";
import { CameraPermissionError } from "@/app/canvas/components/camera/CameraPermissionError";
import { useCallback, useState } from "react";

type CameraCaptureStep = "live" | "crop" | "error";

type CameraCaptureProps = {
  onCapture: (dataUrl: string) => void;
};

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [step, setStep] = useState<CameraCaptureStep>("live");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = useCallback((imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setStep("crop");
  }, []);

  const handlePermissionError = useCallback(() => {
    setStep("error");
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setStep("live");
  }, []);

  const handleCropComplete = useCallback(
    (croppedImageDataUrl: string) => {
      onCapture(croppedImageDataUrl);
    },
    [onCapture]
  );

  const handleImport = useCallback((imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setStep("crop");
  }, []);

  switch (step) {
    case "error":
      return <CameraPermissionError onRetry={handleRetry} onImport={handleImport} />;

    case "crop":
      if (!capturedImage) {
        setStep("live");
        return null;
      }
      return (
        <CameraCropView
          imageSrc={capturedImage}
          onCropComplete={handleCropComplete}
          onRetake={handleRetake}
        />
      );

    case "live":
    default:
      return (
        <CameraLiveView
          onCapture={handleCapture}
          onPermissionError={handlePermissionError}
        />
      );
  }
}
