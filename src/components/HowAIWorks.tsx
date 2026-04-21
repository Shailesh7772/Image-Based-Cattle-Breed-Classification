import { motion } from "framer-motion";
import { Upload, ImageIcon, Brain, BarChart3, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { icon: Upload, title: "Image Upload", desc: "User uploads a cattle photograph via drag-and-drop or camera capture." },
  { icon: ImageIcon, title: "Preprocessing", desc: "Image is resized, normalized, and augmented for optimal model input." },
  { icon: Brain, title: "Deep Learning Model", desc: "A vision AI model analyzes the image using trained feature extractors." },
  { icon: BarChart3, title: "Breed Prediction", desc: "The model outputs confidence scores across all 50 breed classes." },
  { icon: Eye, title: "Result Visualization", desc: "Top predictions, breed info, and visual explanations are displayed." },
];

export function HowAIWorks() {
  return (
    <section id="how-ai-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">How the AI Works</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            A five-step pipeline from image capture to breed identification.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <Card className="glass flex-1">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <step.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primary mb-1">Step {i + 1}</div>
                      <h3 className="font-display text-lg font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </CardContent>
                </Card>
                {/* Center dot */}
                <div className="hidden md:flex h-8 w-8 rounded-full gradient-primary items-center justify-center shrink-0 z-10 shadow-lg">
                  <span className="text-primary-foreground text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
