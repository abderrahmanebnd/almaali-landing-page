import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
    { name: "الطلاب", href: "/admin/students", icon: Users },
    { name: "الأساتذة", href: "/admin/teachers", icon: GraduationCap },
    { name: "التسجيلات", href: "/admin/registrations", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-30 w-64 bg-card/95 backdrop-blur-sm border-l border-border shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0  lg:inset-0 lg:bg-card lg:backdrop-blur-non",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                أ
              </span>
            </div>
            <h2 className="text-lg font-semibold text-primary">لوحة الإدارة</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-muted"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:shadow-sm"
                  )
                }
              >
                <item.icon className="ml-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/80 px-4 py-3 rounded-xl transition-all duration-200"
            >
              <LogOut className="ml-3 h-5 w-5" />
              تسجيل الخروج
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:mr-64 min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-muted-foreground">
                مرحباً بك في لوحة الإدارة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              متصل
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
