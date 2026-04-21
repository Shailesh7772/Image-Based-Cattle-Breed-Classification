import { motion } from "framer-motion";
import { Clock, BarChart3, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PredictionResponse } from "@/lib/breeds";

interface Props {
  result: PredictionResponse;
  imageUrl: string;
}

export function PredictionDashboard({ result, imageUrl }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-2xl font-bold text-center mb-6">
        Prediction Results
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Image + top prediction */}
        <Card className="glass overflow-hidden">
          <img src={imageUrl} alt="Analyzed cattle" className="w-full h-52 object-cover" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Predicted Breed</p>
                <p className="font-display text-xl font-bold">{result.predicted_breed}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold text-primary">{result.confidence}%</span>
              </div>
              <Progress value={result.confidence} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Right: Stats + top 5 */}
        <div className="space-y-4">
          <Card className="glass">
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Latency</p>
                <p className="text-sm font-semibold">{result.processing_time}s</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-primary" />
                Top Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.top_predictions.map((pred, i) => (
                <motion.div
                  key={pred.breed}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className={i === 0 ? "font-semibold" : "text-muted-foreground"}>
                      {i + 1}. {pred.breed}
                    </span>
                    <span className={i === 0 ? "font-bold text-primary" : "text-muted-foreground"}>
                      {pred.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={pred.confidence}
                    className={`h-2 ${i === 0 ? "" : "[&>div]:bg-muted-foreground/40"}`}
                  />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
