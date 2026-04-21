import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { classifyBreed, type PredictionResponse } from "@/lib/breeds";
import { toast } from "@/hooks/use-toast";

interface Props {
  onResult: (result: PredictionResponse, imageUrl: string) => void;
}

export function ImageUploader({ onResult }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileName(file.name);
      setLoading(true);

      try {
        const result = await classifyBreed(file);
        onResult(result, url);
      } catch (err) {
        toast({
          title: "Classification failed",
          description: err instanceof Error ? err.message : "Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [onResult]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setPreview(null);
    setLoading(false);
    setFileName("");
  };

  return (
    <section id="upload" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Classify Your Cattle
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Upload a clear photo of a cow and our AI will identify the breed instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.label
                key="dropzone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`
                  relative flex flex-col items-center justify-center gap-4
                  rounded-2xl border-2 border-dashed p-12 cursor-pointer
                  transition-all duration-300
                  ${
                    dragOver
                      ? "border-primary bg-accent/50 scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:bg-accent/30"
                  }
                `}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onFileSelect}
                />
                <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center">
                  <Upload className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-lg">
                    Drop image here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Button size="sm" variant="outline" className="pointer-events-none">
                    <Camera className="h-4 w-4 mr-1" /> Take Photo
                  </Button>
                  <Button size="sm" variant="outline" className="pointer-events-none">
                    <ImageIcon className="h-4 w-4 mr-1" /> Gallery
                  </Button>
                </div>
              </motion.label>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden glass"
              >
                <img
                  src={preview}
                  alt="Uploaded cattle"
                  className="w-full h-72 object-cover"
                />
                {loading && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="font-display font-semibold">Analyzing breed…</p>
                    <p className="text-sm text-muted-foreground">
                      Running model inference
                    </p>
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
                  <p className="text-sm text-muted-foreground truncate">
                    {fileName}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
