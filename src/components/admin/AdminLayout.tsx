import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  ClipboardList, 
  LogOut,
  Menu,
  X
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
      <div className={cn(
        "fixed inset-y-0 right-0 z-30 w-64 bg-card border-l border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h2 className="text-lg font-semibold text-primary">لوحة الإدارة</h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="ml-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="ml-3 h-5 w-5" />
              تسجيل الخروج
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:mr-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-background border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-sm text-muted-foreground">
              مرحباً بك في لوحة الإدارة
            </span>
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