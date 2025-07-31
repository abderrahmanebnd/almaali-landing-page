import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, GraduationCap, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Teacher {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  experience: string;
  education: string;
  subjects: string[];
  email: string;
  phone: string;
  bio: string;
  achievements: string[];
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "أ. فاطمة بن علي",
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
    specialty: "الرياضيات والفيزياء",
    experience: "8 سنوات",
    education: "ماجستير في الرياضيات - جامعة الجزائر",
    subjects: ["الرياضيات", "الفيزياء"],
    email: "fatima.benali@academy.com",
    phone: "0555 123 456",
    bio: "أستاذة متخصصة في الرياضيات والفيزياء مع خبرة واسعة في التدريس وإعداد الطلاب لامتحانات البكالوريا.",
    achievements: ["أفضل أستاذة للسنة 2023", "شهادة التميز في التدريس", "دورات تدريبية متقدمة"]
  },
  {
    id: 2,
    name: "أ. محمد الحسني",
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face",
    specialty: "العلوم الطبيعية والكيمياء",
    experience: "12 سنة",
    education: "دكتوراه في البيولوجيا - جامعة وهران",
    subjects: ["العلوم الطبيعية", "الكيمياء"],
    email: "mohamed.hosni@academy.com",
    phone: "0666 789 012",
    bio: "دكتور في البيولوجيا مع شغف كبير لتبسيط العلوم المعقدة للطلاب وجعلها مفهومة وممتعة.",
    achievements: ["باحث متميز", "مؤلف 3 كتب علمية", "محاضر دولي"]
  },
  {
    id: 3,
    name: "أ. سارة مرادي",
    photo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face",
    specialty: "اللغات الأجنبية",
    experience: "6 سنوات",
    education: "ماجستير في اللسانيات التطبيقية - جامعة تلمسان",
    subjects: ["الإنجليزية", "الفرنسية"],
    email: "sara.moradi@academy.com",
    phone: "0777 345 678",
    bio: "أستاذة متخصصة في تعليم اللغات الأجنبية بطرق حديثة وتفاعلية تساعد الطلاب على الإتقان السريع.",
    achievements: ["شهادة TESOL", "مدربة معتمدة", "خبيرة في التعلم التفاعلي"]
  },
  {
    id: 4,
    name: "أ. أحمد زيتوني",
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face",
    specialty: "الحساب الذهني والسوروبان",
    experience: "5 سنوات",
    education: "إجازة في الرياضيات + شهادات دولية في السوروبان",
    subjects: ["الحساب الذهني", "السوروبان"],
    email: "ahmed.zitouni@academy.com",
    phone: "0888 901 234",
    bio: "خبير معتمد في الحساب الذهني والسوروبان مع شهادات دولية، متخصص في تطوير القدرات الذهنية للأطفال.",
    achievements: ["مدرب دولي معتمد", "بطل وطني في السوروبان", "مؤسس برنامج تدريبي متقدم"]
  }
];

const Teachers = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            فريق التدريس
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تعرف على نخبة من الأساتذة المتميزين الذين يقدمون أفضل التعليم والتوجيه لطلابنا
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={teacher.photo} 
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl text-primary">{teacher.name}</CardTitle>
                <p className="text-accent font-medium">{teacher.specialty}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {teacher.bio}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-sm">
                    <GraduationCap className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">التعليم:</span>
                    <span className="text-muted-foreground">{teacher.education}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Award className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">الخبرة:</span>
                    <span className="text-muted-foreground">{teacher.experience}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">البريد:</span>
                    <span className="text-muted-foreground">{teacher.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">الهاتف:</span>
                    <span className="text-muted-foreground">{teacher.phone}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">المواد التي يدرسها:</h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">{subject}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">الإنجازات:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {teacher.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full ml-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full mt-4">
                  تواصل مع الأستاذ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Teachers;