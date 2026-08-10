import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Newspaper, LayoutDashboard, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { checkSession, logout } from "@/lib/admin-api.ts";
import AdminLogin from "@/pages/admin/Login.tsx";
import { cn } from "@/lib/utils.ts";

const NAV_ITEMS = [
  { to: "/admin", label: "Табло", icon: LayoutDashboard, end: true },
  { to: "/admin/news", label: "Новини", icon: Newspaper, end: false },
];

export default function AdminApp() {
  const [status, setStatus] = useState<"checking" | "authenticated" | "guest">("checking");
  const navigate = useNavigate();

  useEffect(() => {
    checkSession()
      .then((r) => setStatus(r.authenticated ? "authenticated" : "guest"))
      .catch(() => setStatus("guest"));
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
      </div>
    );
  }

  if (status === "guest") {
    return <AdminLogin onSuccess={() => setStatus("authenticated")} />;
  }

  async function handleLogout() {
    await logout().catch(() => {});
    setStatus("guest");
    navigate("/admin");
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="w-60 shrink-0 border-r bg-background flex flex-col">
        <div className="px-4 py-5 border-b">
          <Link to="/admin" className="font-semibold">
            Хоспис Маринела
          </Link>
          <p className="text-xs text-muted-foreground">Администрация</p>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="size-4" />
            Изход
          </Button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6">
        <Outlet />
      </main>
    </div>
  );
}
