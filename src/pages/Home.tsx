import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Camera, Brain, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroCattle from "@/assets/hero-cattle.jpg";

const features = [
  { icon: Brain, title: "Real-time AI Prediction", desc: "Get instant breed identification powered by advanced vision AI models." },
  { icon: Shield, title: "50+ Breeds Supported", desc: "Comprehensive database of Indian cattle breeds with detailed profiles." },
  { icon: Camera, title: "Camera Detection", desc: "Capture photos directly from your device camera for classification." },
  { icon: Sparkles, title: "Explainable AI", desc: "Understand why the AI made its prediction with visual explanations." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroCattle} alt="Indian cattle in field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
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
              Identify Indian cattle breeds using state-of-the-art vision AI.
              Capture or upload a photo and get accurate predictions with confidence scores.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold glow-primary" asChild>
                <Link to="/classify">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Classification
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link to="/breeds">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Breeds
                </Link>
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
                <Camera className="h-4 w-4 text-primary" />
                <span>Camera Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Platform Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Everything you need for AI-powered cattle breed identification.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass h-full text-center hover:glow-primary transition-shadow duration-300">
                  <CardContent className="pt-8 pb-6 flex flex-col items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center">
                      <f.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/classify">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
