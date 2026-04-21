import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Droplets, Palette, GitBranch, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BREED_DATABASE } from "@/lib/breedData";
import { getBreedDescription } from "@/lib/breedDescriptions";
import { getBreedHeroImageUrl } from "@/lib/breedHeroImages";

export default function BreedDetail() {
  const { breedName } = useParams();
  const name = decodeURIComponent(breedName || "");
  const breed = BREED_DATABASE[name];
  const { description, importance } = getBreedDescription(name);

  if (!breed) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Breed Not Found</h1>
        <Button asChild>
          <Link to="/breeds">Back to Breeds</Link>
        </Button>
      </div>
    );
  }

  const details = [
    { icon: MapPin, label: "Origin", value: breed.origin },
    { icon: GitBranch, label: "Primary Use", value: breed.use },
    { icon: Droplets, label: "Milk Yield", value: breed.milk_yield },
    { icon: Palette, label: "Coat Color", value: breed.coat_color },
    { icon: GitBranch, label: "Horn Type", value: breed.horn_type },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/breeds">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Breeds
            </Link>
          </Button>

          {/* Hero */}
          <div className="rounded-2xl overflow-hidden glass mb-8">
            <div className="h-64 md:h-80 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center relative overflow-hidden">
              {(() => {
                const heroImageUrl = getBreedHeroImageUrl(name);
                if (!heroImageUrl) {
                  return (
                    <span className="relative z-10 text-8xl md:text-9xl font-display font-bold text-primary/30">
                      {name.charAt(0)}
                    </span>
                  );
                }

                return (
                  <img
                    src={heroImageUrl}
                    alt={`${name} breed`}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                );
              })()}
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold">{name}</h1>
                <Badge className="gradient-warm text-secondary-foreground">{breed.use}</Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{breed.state}, India</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {details.map((d) => (
              <Card key={d.label} className="glass">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <d.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-semibold">{d.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="glass">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Key Features</p>
                <p className="text-sm font-semibold">{breed.features}</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="glass mb-8">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-xl font-bold mb-4">About {name}</h2>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>

          {/* Importance */}
          <Card className="glass glow-primary">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-secondary" />
                Importance of This Breed
              </h2>
              <ul className="space-y-3">
                {importance.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
