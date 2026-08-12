import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { buildMeta } from "@/lib/seo.ts";

export const meta = () => buildMeta("/404");

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Страницата не е намерена</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Страницата, която търсите, не съществува или е преместена.
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link to="/">Обратно към началната страница</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
