import { useState, useRef, useCallback } from "react";
import { Camera, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      // Fallback: use file input with capture
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) onCapture(file);
      };
      input.click();
      onClose();
    }
  }, [onCapture, onClose]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  }, []);

  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCaptured(dataUrl);
    stopCamera();
  }, [stopCamera]);

  const confirmPhoto = useCallback(() => {
    if (!captured) return;
    fetch(captured)
      .then((r) => r.blob())
      .then((blob) => {
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        onCapture(file);
        onClose();
      });
  }, [captured, onCapture, onClose]);

  const retake = useCallback(() => {
    setCaptured(null);
    startCamera();
  }, [startCamera]);

  // Auto-start
  useState(() => {
    startCamera();
  });

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold">Camera Capture</h3>
          <Button variant="ghost" size="icon" onClick={() => { stopCamera(); onClose(); }}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-muted aspect-video">
          {!captured && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
          {captured && (
            <img src={captured} alt="Captured" className="w-full h-full object-cover" />
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="flex items-center justify-center gap-4 mt-6">
          {!captured && streaming && (
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground h-14 w-14 rounded-full p-0"
              onClick={takePhoto}
            >
              <Camera className="h-6 w-6" />
            </Button>
          )}
          {captured && (
            <>
              <Button variant="outline" size="lg" onClick={retake}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake
              </Button>
              <Button size="lg" className="gradient-primary text-primary-foreground" onClick={confirmPhoto}>
                Use This Photo
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
