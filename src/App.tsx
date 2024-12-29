import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Integrations from "./pages/Integrations";
import Activity from "./pages/Activity";
import Domains from "./pages/Domains";
import Usage from "./pages/Usage";
import Monitoring from "./pages/Monitoring";
import Observability from "./pages/Observability";
import Storage from "./pages/Storage";
import AI from "./pages/AI";
import Support from "./pages/Support";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="activity" element={<Activity />} />
            <Route path="domains" element={<Domains />} />
            <Route path="usage" element={<Usage />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="observability" element={<Observability />} />
            <Route path="storage" element={<Storage />} />
            <Route path="ai" element={<AI />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;