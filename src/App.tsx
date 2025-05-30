
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Production from "./pages/Production";
import AIInsights from "./pages/AIInsights";
import DigitalTwin from "./pages/DigitalTwin";
import Blockchain from "./pages/Blockchain";
import BlockchainArchitecture from "./pages/BlockchainArchitecture";
import Identity from "./pages/Identity";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ModelTraining from "./pages/ModelTraining";
import AIEngine from "./pages/AIEngine";
import CryptoEngine from "./pages/CryptoEngine";
import LotGenealogy from "./pages/LotGenealogy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/production" element={<Production />} />
          <Route path="/insights" element={<AIInsights />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/blockchain-architecture" element={<BlockchainArchitecture />} />
          <Route path="/identity" element={<Identity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/model-training" element={<ModelTraining />} />
          <Route path="/ai-engine" element={<AIEngine />} />
          <Route path="/crypto-engine" element={<CryptoEngine />} />
          <Route path="/lot-genealogy" element={<LotGenealogy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
