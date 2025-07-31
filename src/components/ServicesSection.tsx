import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Languages, Calculator, Users, BookOpen, Trophy } from "lucide-react";
import educationIcons from "@/assets/education-icons.jpg";
import sorobanImage from "@/assets/soroban-abacus.jpg";

const ServicesSection = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "دروس تقوية ودعم جميع الأطوار",
      description: "برامج دعم تعليمي شاملة لجميع المراحل من الابتدائي إلى الثانوي",
      features: ["دروس فردية ومجموعات صغيرة", "مراجعة الامتحانات", "متابعة يومية"],
      badge: "الأكثر طلباً",
      color: "bg-primary"
    },
    {
      icon: Languages,
      title: "تعليم اللغات",
      description: "دورات متخصصة في اللغات العربية والفرنسية والإنجليزية",
      features: ["محادثة وتطبيق عملي", "قواعد وإملاء", "تحضير امتحانات دولية"],
      badge: "جديد",
      color: "bg-secondary"
    },
    {
      icon: Calculator,
      title: "الحساب الذهني السوروبان",
      description: "تطوير مهارات الحساب الذهني والتركيز باستخدام تقنية السوروبان اليابانية",
      features: ["تطوير الذاكرة", "سرعة الحساب", "تقوية التركيز"],
      badge: "مميز",
      color: "bg-accent"
    },
    {
      icon: Users,
      title: "محاضرات وملتقيات تدريبية",
      description: "فعاليات تعليمية وورش عمل لتطوير المهارات الشخصية والأكاديمية",
      features: ["ورش تطوير الذات", "مهارات القيادة", "التحضير الجامعي"],
      badge: "",
      color: "bg-primary-light"
    },
    {
      icon: BookOpen,
      title: "دروس تدريبية واستشارات",
      description: "استشارات أكاديمية ومهنية لتوجيه الطلاب نحو المسار المناسب",
      features: ["توجيه أكاديمي", "استشارات مهنية", "خطط دراسية مخصصة"],
      badge: "",
      color: "bg-gradient-primary"
    },
    {
      icon: Trophy,
      title: "تحضير المسابقات",
      description: "إعداد خاص للمسابقات الأكاديمية والامتحانات التنافسية",
      features: ["مسابقات الرياضيات", "أولمبياد العلوم", "مسابقات اللغات"],
      badge: "نتائج مميزة",
      color: "bg-gradient-accent"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">خدماتنا التعليمية</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات التعليمية المصممة لتلبية احتياجات طلابنا في جميع المراحل الدراسية
          </p>
        </div>

        {/* Featured Services with Images */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="academy-card border-0 overflow-hidden">
            <div className="relative h-48">
              <img 
                src={educationIcons} 
                alt="خدمات تعليمية متنوعة"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white">
                <h3 className="text-2xl font-bold">برامج تعليمية شاملة</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                نوفر برامج تعليمية متنوعة تغطي جميع التخصصات والمراحل الدراسية، 
                مع التركيز على الفهم العميق والتطبيق العملي للمفاهيم.
              </p>
            </CardContent>
          </Card>

          <Card className="academy-card border-0 overflow-hidden">
            <div className="relative h-48">
              <img 
                src={sorobanImage} 
                alt="الحساب الذهني السوروبان"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white">
                <h3 className="text-2xl font-bold">السوروبان الياباني</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                تعلم فن الحساب الذهني السريع باستخدام تقنية السوروبان اليابانية التقليدية، 
                التي تطور قدرات الدماغ والتركيز بشكل مذهل.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="academy-card border-0 group relative overflow-hidden">
              {service.badge && (
                <Badge 
                  className="absolute top-4 left-4 z-10 bg-secondary text-accent-foreground"
                >
                  {service.badge}
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 hover:bg-primary hover:text-white transition-colors"
                >
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">مستعد لبدء رحلتك التعليمية؟</h3>
            <p className="text-xl mb-6 opacity-90">
              انضم إلى آلاف الطلاب الذين حققوا أحلامهم معنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary text-accent-foreground hover:bg-secondary/90 font-semibold px-8"
              >
                سجل الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;