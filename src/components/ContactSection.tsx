import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, MapPin, Clock, Facebook, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">تواصل معنا</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على جميع استفساراتكم وتقديم المساعدة اللازمة. تواصلوا معنا بأي طريقة تناسبكم
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="academy-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input id="firstName" placeholder="أدخل اسمك الأول" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">اسم العائلة</Label>
                    <Input id="lastName" placeholder="أدخل اسم العائلة" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" type="tel" placeholder="0791 67 07 33" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع</Label>
                  <Input id="subject" placeholder="موضوع رسالتك" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea 
                    id="message" 
                    placeholder="اكتب رسالتك هنا..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full hero-button">
                  <Mail className="ml-2 h-5 w-5" />
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="academy-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">اتصل بنا</h3>
                    <p className="text-muted-foreground">للاستفسارات والتسجيل</p>
                  </div>
                </div>
                <div className="space-y-2 mr-16">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">0791 67 07 33</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span>واتساب متاح 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="academy-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">عنواننا</h3>
                    <p className="text-muted-foreground">زوروا أكاديميتنا</p>
                  </div>
                </div>
                <div className="mr-16">
                  <p className="leading-relaxed">
                    إيشيليا، أمام ثانوية محمد الشريف مساعدية
                    <br />
                    ولاية عين الدفلى، الجزائر
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="academy-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">أوقات العمل</h3>
                    <p className="text-muted-foreground">مفتوح طوال الأسبوع</p>
                  </div>
                </div>
                <div className="space-y-2 mr-16">
                  <div className="flex justify-between">
                    <span>السبت - الخميس</span>
                    <span className="font-medium">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة</span>
                    <span className="font-medium">14:00 - 18:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="academy-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">تابعنا على فيسبوك</h3>
                    <p className="text-muted-foreground">آخر الأخبار والإعلانات</p>
                  </div>
                </div>
                <div className="mr-16">
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-blue-600 hover:text-white transition-colors"
                    asChild
                  >
                    <a 
                      href="https://web.facebook.com/Academy.Almaali" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Facebook className="ml-2 h-4 w-4" />
                      زيارة صفحتنا
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">هل تحتاج استشارة تعليمية؟</h3>
            <p className="text-xl mb-6 opacity-90">
              فريقنا التعليمي جاهز لمساعدتك في اختيار البرنامج المناسب
            </p>
            <Button 
              size="lg" 
              className="bg-secondary text-accent-foreground hover:bg-secondary/90 font-semibold px-8"
            >
              <MessageCircle className="ml-2 h-5 w-5" />
              احجز استشارة مجانية
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;