import { motion } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateExplanations } from "@/lib/breedExplanations";

interface Props {
  breedName: string;
}

export function WhyThisPrediction({ breedName }: Props) {
  const explanations = generateExplanations(breedName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass glow-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-5 w-5 text-primary" />
            Why This Prediction?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {explanations.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">{exp}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
