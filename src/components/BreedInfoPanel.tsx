import { motion } from "framer-motion";
import { MapPin, Milk, Palette, CircleDot, Fingerprint, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BREED_DATABASE, type BreedInfo } from "@/lib/breedData";

interface Props {
  breedName: string;
}

const infoItems = (info: BreedInfo) => [
  { icon: MapPin, label: "Origin State", value: info.origin },
  { icon: Target, label: "Primary Use", value: info.use },
  { icon: Milk, label: "Avg Milk Yield", value: info.milk_yield },
  { icon: Palette, label: "Coat Color", value: info.coat_color },
  { icon: CircleDot, label: "Horn Type", value: info.horn_type },
  { icon: Fingerprint, label: "Key Features", value: info.features },
];

export function BreedInfoPanel({ breedName }: Props) {
  const info = BREED_DATABASE[breedName];
  if (!info) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-warm flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  {breedName} — Breed Profile
                </CardTitle>
                <Badge className="gradient-primary text-primary-foreground text-sm px-3 py-1">
                  {info.use} Purpose
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {infoItems(info).map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                  >
                    <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                    </div>
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
