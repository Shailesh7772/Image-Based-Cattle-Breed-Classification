import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { classifyBreed, type PredictionResponse } from "@/lib/breeds";
import { toast } from "@/hooks/use-toast";
import { PredictionDashboard } from "@/components/PredictionDashboard";
import { WhyThisPrediction } from "@/components/WhyThisPrediction";
import { BreedInfoPanel } from "@/components/BreedInfoPanel";
import { BreedMap } from "@/components/BreedMap";
import { DownloadReport } from "@/components/DownloadReport";
import { CameraCapture } from "@/components/CameraCapture";
import { BharathPashudhanSubmissionCTA } from "@/components/BharathPashudhanSubmissionCTA";

export default function Classify() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    setLoading(true);
    setResult(null);

    try {
      const res = await classifyBreed(file);
      setResult(res);
    } catch (err) {
      toast({
        title: "Classification failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const reset = () => {
    setPreview(null);
    setLoading(false);
    setFileName("");
    setResult(null);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Classify Your <span className="text-gradient">Cattle</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Capture or upload a clear photo and our AI will identify the breed instantly.
          </p>
        </motion.div>

        {/* Upload / Camera Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {/* Camera Button - Primary */}
                <Button
                  size="lg"
                  className="w-full gradient-primary text-primary-foreground h-14 text-base font-semibold glow-primary"
                  onClick={() => setShowCamera(true)}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Open Camera
                </Button>

                {/* Upload Zone - Secondary */}
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-accent/30 p-10 cursor-pointer transition-all duration-300"
                >
                  <input type="file" accept="image/*" className="sr-only" onChange={onFileSelect} />
                  <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-display font-semibold text-lg">Or drop an image here</p>
                    <p className="text-sm text-muted-foreground mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <Button size="sm" variant="outline" className="pointer-events-none">
                    <ImageIcon className="h-4 w-4 mr-1" /> Browse Files
                  </Button>
                </label>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden glass"
              >
                <img src={preview} alt="Uploaded cattle" className="w-full h-72 object-cover" />
                {loading && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="font-display font-semibold">Analyzing breed…</p>
                    <p className="text-sm text-muted-foreground">Running model inference</p>
                  </div>
                )}
                {!loading && (
                  <button
                    onClick={reset}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div className="p-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground truncate">{fileName}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        {result && preview && (
          <>
            <div className="max-w-5xl mx-auto mt-12 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PredictionDashboard result={result} imageUrl={preview} />
              </div>
              <div>
                <WhyThisPrediction breedName={result.predicted_breed} />
              </div>
            </div>
            <BreedInfoPanel breedName={result.predicted_breed} />
            <BreedMap breedName={result.predicted_breed} />
            <DownloadReport result={result} imageUrl={preview} />
            <BharathPashudhanSubmissionCTA result={result} />
          </>
        )}
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={(file) => {
            setShowCamera(false);
            handleFile(file);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
