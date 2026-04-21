import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BREED_DATABASE } from "@/lib/breedData";
import { MapPin } from "lucide-react";
import { getBreedHeroImageUrl } from "@/lib/breedHeroImages";

const breeds = Object.entries(BREED_DATABASE)
  .filter(([name]) => getBreedHeroImageUrl(name) !== undefined)
  .slice(0, 48);

export default function Breeds() {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Supported Indian <span className="text-gradient">Cattle Breeds</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Our model recognizes {breeds.length} Indian cattle breeds. Click any breed to learn more.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {breeds.map(([name, info], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
            >
              <Link to={`/breeds/${encodeURIComponent(name)}`}>
                <Card className="glass h-full hover:glow-primary transition-all duration-300 hover:scale-[1.03] cursor-pointer group">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-display font-bold text-primary group-hover:scale-110 transition-transform">
                      {name.charAt(0)}
                    </div>
                    <h3 className="font-display font-semibold text-sm leading-tight">{name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {info.state}
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >
                      {info.use}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
