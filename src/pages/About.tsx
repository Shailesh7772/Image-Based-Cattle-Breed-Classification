import { motion } from "framer-motion";
import { Brain, Database, Shield, Globe, Users, Cpu, BookOpen, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techStack = [
  { icon: Brain, label: "Gemini Vision AI", desc: "State-of-the-art multimodal model for breed identification" },
  { icon: Cpu, label: "React + TailwindCSS", desc: "Modern frontend stack for responsive, beautiful interfaces" },
  { icon: Database, label: "Lovable Cloud", desc: "Serverless edge functions for AI inference pipeline" },
  { icon: Shield, label: "50+ Breed Database", desc: "Comprehensive structured knowledge of Indian cattle breeds" },
];

export default function About() {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            About <span className="text-gradient">CattleAI</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            An AI-powered platform for Indian cattle breed identification, built for farmers, researchers, and veterinary professionals.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="glass mb-10">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                India is home to over 50 recognized cattle breeds, each uniquely adapted to local climates and farming needs. 
                CattleAI aims to make breed identification accessible to everyone — from small-scale farmers to veterinary researchers — 
                using cutting-edge artificial intelligence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By combining deep learning with comprehensive breed knowledge, we help preserve India's rich livestock biodiversity 
                and support informed breeding decisions that strengthen our agricultural heritage.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Who is this for */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="glass mb-10">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Who Is This For?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Farmers", desc: "Quick breed identification from photos for better livestock management" },
                  { title: "Researchers", desc: "Breed classification tools for livestock biodiversity studies" },
                  { title: "Veterinary Students", desc: "Interactive learning platform for Indian cattle breed recognition" },
                  { title: "Agriculture Experts", desc: "Data-driven insights for breeding programs and conservation" },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-accent/30 border border-border/30">
                    <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Technology Stack
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {techStack.map((t) => (
              <Card key={t.label} className="glass hover:glow-primary transition-shadow duration-300">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <t.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{t.label}</h3>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Bharat Pashudhan Integration */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="glass glow-secondary border-secondary/30">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl gradient-warm flex items-center justify-center">
                  <Landmark className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">Bharat Pashudhan Integration</h2>
                  <Badge variant="outline" className="text-secondary border-secondary/50">Upcoming</Badge>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CattleAI is being designed for future integration with the Government of India's Bharat Pashudhan platform — 
                the national livestock management system. This integration will enable:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Digital cattle identification and registration using AI-based breed recognition",
                  "Seamless connectivity with government livestock database APIs",
                  "Automated breed verification for livestock census and tagging programs",
                  "Support for farmers and veterinary systems in rural areas with mobile-first design",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-secondary">{i + 1}</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-4 italic">
                * This module is currently in the planning stage. API integration will be available in a future release.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
