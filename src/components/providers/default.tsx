import { QueryClientProvider } from "./query-client.tsx";
import { ThemeProvider } from "./theme.tsx";
import { Toaster } from "../ui/sonner.tsx";
import { TooltipProvider } from "../ui/tooltip.tsx";
import { SiteContentProvider } from "@/lib/site-content.tsx";

export function DefaultProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <TooltipProvider>
        <ThemeProvider>
          <SiteContentProvider>
            <Toaster />
            {children}
          </SiteContentProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
