
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
import Identity from "./pages/Identity";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ModelTraining from "./pages/ModelTraining";

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
          <Route path="/identity" element={<Identity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/model-training" element={<ModelTraining />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
