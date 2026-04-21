import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCattle from "@/assets/hero-cattle.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroCattle} alt="Indian cattle in field" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            Powered by Deep Learning
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            AI Cattle Breed{" "}
            <span className="text-gradient">Classifier</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Instantly identify 50+ Indian cattle breeds using state-of-the-art
            vision AI. Upload a photo and get accurate breed predictions with
            confidence scores in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold" asChild>
              <a href="#upload">
                <Zap className="h-5 w-5 mr-2" />
                Try AI Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>50+ Breeds</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-secondary" />
              <span>Real-time</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Auto-ML</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#upload">
            <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
