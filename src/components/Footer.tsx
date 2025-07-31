import { Button } from "@/components/ui/button";
import {
  Facebook,
  Phone,
  MessageCircle,
  MapPin,
  GraduationCap,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "الرئيسية", href: "#home" },
    { name: "من نحن", href: "#about" },
    { name: "خدماتنا", href: "#services" },
    { name: "الشهادات", href: "#testimonials" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  const services = [
    "دروس تقوية ودعم",
    "تعليم اللغات",
    "الحساب الذهني",
    "المحاضرات التدريبية",
    "الاستشارات الأكاديمية",
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  أكاديمية زينو للتعليم والتدريب
                </h3>
                <p className="text-sm text-white/70">للتعليم والتكوين</p>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed">
              بفكري يسمو وطني - مؤسسة تعليمية رائدة تهدف إلى تطوير قدرات الطلاب
              وإعدادهم لمستقبل أكاديمي ومهني متميز.
            </p>

            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100093643377386"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                asChild
              >
                <a
                  href="https://wa.me/213791670733"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">خدماتنا</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white/80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">معلومات التواصل</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <div className="text-white/80">
                  <p>حمام ضلعة بالقرب من البريد الوطني</p>
                  <p>ولاية المسيلة، الجزائر</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-white/80">0778 65 01 59</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-secondary" />
                <span className="text-white/80">واتساب متاح 24/7</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h5 className="font-semibold mb-2">أوقات العمل</h5>
              <div className="text-sm text-white/80 space-y-1">
                <div className="flex justify-between">
                  <span>السبت - الخميس</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>الجمعة</span>
                  <span>14:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2024 أكاديمية زينو للتعليم والتدريب . جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-secondary transition-colors"
              >
                سياسة الخصوصية
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-secondary transition-colors"
              >
                شروط الخدمة
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-secondary transition-colors"
              >
                اتفاقية الاستخدام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
