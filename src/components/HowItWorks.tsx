import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Upload Image",
    desc: "Drag and drop or select a cattle photo from your device.",
  },
  {
    icon: Cpu,
    title: "Auto-ML Selection",
    desc: "Our system picks the optimal model architecture for your image.",
  },
  {
    icon: Sparkles,
    title: "Deep Learning Inference",
    desc: "The selected neural network processes and classifies the breed.",
  },
  {
    icon: BarChart3,
    title: "Get Results",
    desc: "View predicted breed, confidence scores, and top alternatives.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Four simple steps to classify any Indian cattle breed with AI.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass h-full text-center">
                <CardContent className="pt-8 pb-6 flex flex-col items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-sm font-bold text-primary">Step {i + 1}</div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
