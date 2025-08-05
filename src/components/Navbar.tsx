import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: "الرئيسية", href: "/", type: "link" },
    { title: "الدورات", href: "/courses", type: "link" },
    { title: "الأساتذة", href: "/teachers", type: "link" },
    { title: "عن الأكاديمية", href: "/#about", type: "anchor" },
    { title: "اتصل بنا", href: "/#contact", type: "anchor" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-2">
            <div className="text-2xl font-bold text-primary">
              أكاديمية العلا والمعالي
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </a>
                );
              }
            })}
            <Link to="/courses">
              <Button size="sm" className="mr-4">
                التسجيل الآن
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link to="/courses">
                  <Button size="sm" className="w-full">
                    التسجيل الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
