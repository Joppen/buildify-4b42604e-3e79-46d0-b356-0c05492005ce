
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import AIGenerator from "./pages/AIGenerator";
import AdminDashboard from "./pages/admin/Dashboard";

// Placeholder component for routes that don't exist yet
const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500">This page is under construction.</p>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/ai-generator" element={<AIGenerator />} />
          
          {/* Placeholder Routes */}
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
          <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<PlaceholderPage title="Admin Users" />} />
          <Route path="/admin/projects" element={<PlaceholderPage title="Admin Projects" />} />
          <Route path="/admin/tickets" element={<PlaceholderPage title="Admin Tickets" />} />
          <Route path="/admin/payments" element={<PlaceholderPage title="Admin Payments" />} />
          <Route path="/admin/settings" element={<PlaceholderPage title="Admin Settings" />} />
          <Route path="/admin/analytics" element={<PlaceholderPage title="Admin Analytics" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;