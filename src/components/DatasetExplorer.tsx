import { motion } from "framer-motion";
import { Database, BarChart3, PieChart as PieIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DATASET_STATS, BREED_DATABASE } from "@/lib/breedData";

const COLORS = [
  "hsl(152, 55%, 35%)", "hsl(38, 80%, 55%)", "hsl(200, 80%, 50%)",
  "hsl(340, 65%, 50%)", "hsl(270, 50%, 55%)", "hsl(80, 60%, 45%)",
];

const useDistribution = Object.entries(
  Object.values(BREED_DATABASE).reduce((acc, b) => {
    acc[b.use] = (acc[b.use] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([name, value]) => ({ name, value }));

const topBreeds = [...DATASET_STATS.images_per_breed]
  .sort((a, b) => b.count - a.count)
  .slice(0, 15);

export function DatasetExplorer() {
  return (
    <section id="dataset" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Dataset Explorer
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Explore the training dataset behind our cattle breed classifier.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {[
            { icon: Database, label: "Total Images", value: DATASET_STATS.total_images.toLocaleString() },
            { icon: BarChart3, label: "Breed Classes", value: DATASET_STATS.num_breeds },
            { icon: PieIcon, label: "Avg per Breed", value: Math.round(DATASET_STATS.total_images / DATASET_STATS.num_breeds) },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="glass text-center">
                <CardContent className="pt-6 pb-4 flex flex-col items-center gap-2">
                  <s.icon className="h-6 w-6 text-primary" />
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Bar chart */}
          <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" /> Images per Breed (Top 15)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topBreeds} margin={{ left: -10, right: 10 }}>
                    <XAxis dataKey="breed" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                    <Bar dataKey="count" fill="hsl(152, 55%, 35%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="glass h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <PieIcon className="h-4 w-4 text-secondary" /> Breed Use Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={useDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, value }) => `${name}: ${value}`}>
                      {useDistribution.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-2 justify-center">
                  {useDistribution.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                      {d.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
