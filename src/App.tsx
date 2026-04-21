import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import Classify from "./pages/Classify";
import Breeds from "./pages/Breeds";
import BreedDetail from "./pages/BreedDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BharatPashudhan from "./pages/BharathPashudhan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/breeds" element={<Breeds />} />
              <Route path="/breeds/:breedName" element={<BreedDetail />} />
              <Route path="/bharath-pashudhan" element={<BharatPashudhan />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
