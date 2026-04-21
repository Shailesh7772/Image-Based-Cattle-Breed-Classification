import { motion } from "framer-motion";
import { Activity, Award, Target, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MODEL_METRICS } from "@/lib/breedData";

const stats = [
  { icon: Activity, label: "Training Accuracy", value: `${MODEL_METRICS.training_accuracy}%` },
  { icon: Target, label: "Validation Accuracy", value: `${MODEL_METRICS.validation_accuracy}%` },
  { icon: Award, label: "Top-5 Accuracy", value: `${MODEL_METRICS.top5_accuracy}%` },
  { icon: Layers, label: "Classes / Images", value: `${MODEL_METRICS.num_classes} / ${MODEL_METRICS.dataset_size.toLocaleString()}` },
];

export function ModelPerformance() {
  return (
    <section id="model" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Model Performance</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Training metrics and convergence curves of our classifier.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="glass text-center">
                <CardContent className="pt-5 pb-4 flex flex-col items-center gap-2">
                  <s.icon className="h-5 w-5 text-primary" />
                  <p className="font-display text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Accuracy Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={MODEL_METRICS.accuracy_history}>
                    <XAxis dataKey="epoch" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                    <Legend />
                    <Line type="monotone" dataKey="train" stroke="hsl(152, 55%, 40%)" strokeWidth={2} dot={false} name="Train" />
                    <Line type="monotone" dataKey="val" stroke="hsl(38, 80%, 55%)" strokeWidth={2} dot={false} name="Validation" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Loss Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={MODEL_METRICS.loss_history}>
                    <XAxis dataKey="epoch" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                    <Legend />
                    <Line type="monotone" dataKey="train" stroke="hsl(152, 55%, 40%)" strokeWidth={2} dot={false} name="Train" />
                    <Line type="monotone" dataKey="val" stroke="hsl(38, 80%, 55%)" strokeWidth={2} dot={false} name="Validation" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
