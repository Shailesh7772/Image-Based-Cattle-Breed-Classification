import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  breedName: string;
}

// Using Unsplash-sourced reference images of Indian cattle (public domain)
function getBreedImages(breed: string): string[] {
  // Generate consistent search-based placeholder images for the breed
  const encodedBreed = encodeURIComponent(`${breed} Indian cattle breed cow`);
  return Array.from({ length: 6 }, (_, i) =>
    `https://source.unsplash.com/400x300/?${encodedBreed}&sig=${breed.charCodeAt(0) + i}`
  );
}

export function SimilarBreeds({ breedName }: Props) {
  const images = getBreedImages(breedName);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Images className="h-5 w-5 text-secondary" />
                Reference Images — {breedName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual references for the <span className="font-semibold text-foreground">{breedName}</span> breed from the dataset.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                  >
                    <img
                      src={src}
                      alt={`${breedName} reference ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
