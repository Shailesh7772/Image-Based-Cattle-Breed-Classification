import { motion } from "framer-motion";
import { CATTLE_BREEDS } from "@/lib/breeds";
import { Badge } from "@/components/ui/badge";
import { getBreedHeroImageUrl } from "@/lib/breedHeroImages";

export function BreedsGrid() {
  const visibleBreeds = CATTLE_BREEDS.filter((breed) => getBreedHeroImageUrl(breed) !== undefined).slice(0, 48);

  return (
    <section id="breeds" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Supported Breeds
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Our model recognizes {visibleBreeds.length} Indian cattle breeds and counting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto"
        >
          {visibleBreeds.map((breed, i) => (
            <motion.div
              key={breed}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
            >
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {breed}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
