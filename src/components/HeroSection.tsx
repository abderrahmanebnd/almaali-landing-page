import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                أكاديمية العلا والمعالي
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary">
                للتعليم والتكوين
              </h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                بفكري يسمو وطني
              </p>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                نحن نؤمن بأن التعليم هو الأساس لبناء مستقبل مشرق. انضم إلينا في رحلة التعلم والتطوير المستمر.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Button 
                size="lg" 
                className="hero-button text-lg px-8 py-6 min-w-[200px]"
              >
                التسجيل الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 min-w-[200px] backdrop-blur-sm"
              >
                <Phone className="ml-2 h-5 w-5" />
                اتصل بنا
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end items-center text-white/90">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-secondary" />
                <span className="font-medium">واتساب: 0791 67 07 33</span>
              </div>
              <div className="text-sm">
                إيشيليا أمام ثانوية محمد الشريف مساعدية
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <img 
                src={heroImage} 
                alt="أكاديمية العلا والمعالي"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">طالب متفوق</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-secondary rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-foreground">15+</div>
                <div className="text-sm text-accent-foreground">سنة خبرة</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;