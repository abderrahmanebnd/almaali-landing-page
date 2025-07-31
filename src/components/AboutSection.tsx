import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, MapPin } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "تعليم متميز",
      description: "منهجية تعليمية حديثة تركز على الفهم العميق والتطبيق العملي"
    },
    {
      icon: Users,
      title: "مدرسون مختصون",
      description: "فريق من المدرسين المؤهلين وذوي الخبرة في مختلف التخصصات"
    },
    {
      icon: Award,
      title: "نتائج مضمونة",
      description: "سجل حافل من النجاحات والتفوق في جميع المراحل التعليمية"
    },
    {
      icon: MapPin,
      title: "موقع متميز",
      description: "في قلب إيشيليا، أمام ثانوية محمد الشريف مساعدية"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">من نحن</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            أكاديمية العلا والمعالي للتعليم والتكوين، مؤسسة تعليمية رائدة تهدف إلى تطوير قدرات الطلاب 
            وإعدادهم لمستقبل أكاديمي ومهني متميز من خلال برامج تعليمية شاملة ومبتكرة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="academy-card border-0 text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">رؤيتنا ورسالتنا</h3>
            <div className="space-y-4">
              <div className="border-r-4 border-primary pr-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">رؤيتنا</h4>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون المرجع الأول في التعليم والتكوين في المنطقة، ونساهم في إعداد جيل متعلم ومبدع قادر على مواجهة تحديات المستقبل.
                </p>
              </div>
              <div className="border-r-4 border-secondary pr-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">رسالتنا</h4>
                <p className="text-muted-foreground leading-relaxed">
                  تقديم تعليم عالي الجودة يجمع بين الأصالة والمعاصرة، وتطوير مهارات الطلاب الأكاديمية والشخصية من خلال بيئة تعليمية محفزة ومبتكرة.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">أهدافنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>تطوير القدرات الأكاديمية والمعرفية للطلاب</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>غرس القيم الأخلاقية والوطنية النبيلة</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>إعداد جيل قادر على الإبداع والابتكار</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>تحقيق التميز في التحصيل الأكاديمي</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;