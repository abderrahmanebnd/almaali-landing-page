import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "أم أحمد",
      role: "ولي أمر",
      content: "ابني أحمد تحسن كثيراً في الرياضيات بعد انضمامه للأكاديمية. المدرسون مختصون والمتابعة ممتازة.",
      rating: 5,
      initials: "أم أ"
    },
    {
      name: "سارة بن علي",
      role: "طالبة ثانوي",
      content: "دروس اللغة الفرنسية هنا ساعدتني كثيراً في تحسين درجاتي. الأساتذة يشرحون بطريقة مبسطة ومفهومة.",
      rating: 5,
      initials: "س ب"
    },
    {
      name: "محمد الطاهر",
      role: "طالب متوسط",
      content: "تعلمت السوروبان هنا وأصبحت أحسب بسرعة مذهلة! زملائي في المدرسة يتعجبون من سرعتي في الحساب.",
      rating: 5,
      initials: "م ط"
    },
    {
      name: "فاطمة زهراء",
      role: "طالبة ابتدائي",
      content: "أحب دروس التقوية هنا لأن المعلمة تشرح بصبر وتعطينا تمارين ممتعة. درجاتي تحسنت كثيراً!",
      rating: 5,
      initials: "ف ز"
    },
    {
      name: "أبو يوسف",
      role: "ولي أمر",
      content: "أكاديمية متميزة بحق. ابنتي يوسف تطورت كثيراً في اللغة الإنجليزية والرياضيات. أنصح بها بقوة.",
      rating: 5,
      initials: "أ ي"
    },
    {
      name: "ليلى كريم",
      role: "طالبة ثانوي",
      content: "المحاضرات التدريبية ساعدتني في تطوير مهاراتي الشخصية وأصبحت أكثر ثقة بنفسي.",
      rating: 5,
      initials: "ل ك"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-secondary text-secondary" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">شهادات طلابنا وأولياء الأمور</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نفخر بثقة طلابنا وأولياء الأمور، وهذه بعض من شهاداتهم التي تحفزنا للاستمرار في التميز
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="academy-card border-0 relative">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
              
              <CardContent className="p-6 pt-12">
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">طالب متخرج</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">15+</div>
            <div className="text-muted-foreground">سنة خبرة</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="text-muted-foreground">نسبة النجاح</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">25+</div>
            <div className="text-muted-foreground">مدرس مختص</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;