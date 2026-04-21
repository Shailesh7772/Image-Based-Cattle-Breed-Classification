import { Dna } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Dna className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">CattleAI</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/classify" className="hover:text-foreground transition-colors">Classify</Link>
            <Link to="/breeds" className="hover:text-foreground transition-colors">Breeds</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-6">
          © 2026 CattleAI — AI-powered cattle breed recognition platform.
        </p>
      </div>
    </footer>
  );
}
