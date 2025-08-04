import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, ArrowLeft, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

interface Course {
  id: number;
  title: string;
  module: string;
  year: string;
  duration: string;
  students: number;
  description: string;
  price: string;
  level: string;
  teacher: {
    name: string;
    photo: string;
  };
}

// Sample courses data (in a real app, this would come from an API)
const courses: Course[] = [
  {
    id: 1,
    title: "الرياضيات المتقدمة",
    module: "الرياضيات",
    year: "السنة الثالثة ثانوي",
    duration: "3 أشهر",
    students: 25,
    description: "دورة شاملة في الرياضيات للتحضير لامتحان البكالوريا. تشمل الدورة جميع المحاور المهمة مثل التحليل الرياضي، الهندسة الفضائية، والاحتماليات. سيتم التركيز على حل التمارين النموذجية وتقنيات الحل السريع.",
    price: "15,000 دج",
    level: "متقدم",
    teacher: {
      name: "أ. فاطمة بن علي",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 2,
    title: "الفيزياء والكيمياء",
    module: "العلوم الفيزيائية",
    year: "السنة الثالثة ثانوي",
    duration: "3 أشهر",
    students: 20,
    description: "دروس تقوية في الفيزياء والكيمياء مع تطبيقات عملية. تشمل الدورة الميكانيك، الكهرباء، الكيمياء العضوية واللاعضوية. سيتم إجراء تجارب عملية لفهم أفضل للمفاهيم النظرية.",
    price: "12,000 دج",
    level: "متوسط",
    teacher: {
      name: "أ. محمد الصغير",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 3,
    title: "اللغة الإنجليزية المكثفة",
    module: "اللغات",
    year: "السنة الثانية ثانوي",
    duration: "4 أشهر",
    students: 30,
    description: "برنامج مكثف لتعلم اللغة الإنجليزية من المستوى المتوسط إلى المتقدم. يشمل المحادثة، القواعد، والكتابة الأكاديمية. مع التحضير لامتحانات الشهادات الدولية.",
    price: "10,000 دج",
    level: "متوسط",
    teacher: {
      name: "أ. سارة جونسون",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    }
  }
];

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
  const course = courses.find(c => c.id === parseInt(id || "0"));

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">الدورة غير موجودة</h1>
            <Link to="/courses">
              <Button variant="outline">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة إلى الدورات
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'متقدم': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى الدورات
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{course.module}</Badge>
                      <Badge variant="outline">{course.year}</Badge>
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{course.price}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  تفاصيل الدورة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">المدة</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">عدد الطلاب</p>
                      <p className="font-medium">{course.students} طالب</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">المستوى</p>
                      <p className="font-medium">{course.level}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Info */}
            <Card>
              <CardHeader>
                <CardTitle>المدرس</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={course.teacher.photo}
                    alt={course.teacher.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{course.teacher.name}</p>
                    <p className="text-sm text-muted-foreground">مدرس {course.module}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>التسجيل في الدورة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                  <p className="text-sm text-muted-foreground">سعر الدورة الكاملة</p>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowRegistrationForm(true)}
                >
                  سجل الآن
                </Button>
                
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المدة:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المستوى:</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الطلاب المسجلين:</span>
                    <span>{course.students}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm 
          course={course}
          onClose={() => setShowRegistrationForm(false)}
        />
      )}
    </div>
  );
};

export default CourseDetails;