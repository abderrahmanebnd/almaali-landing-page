import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
}

const courses: Course[] = [
  {
    id: 1,
    title: "الرياضيات المتقدمة",
    module: "الرياضيات",
    year: "السنة الثالثة ثانوي",
    duration: "3 أشهر",
    students: 25,
    description: "دورة شاملة في الرياضيات للتحضير لامتحان البكالوريا",
    price: "15,000 دج",
    level: "متقدم"
  },
  {
    id: 2,
    title: "الفيزياء والكيمياء",
    module: "العلوم الفيزيائية",
    year: "السنة الثالثة ثانوي",
    duration: "3 أشهر",
    students: 20,
    description: "دروس تقوية في الفيزياء والكيمياء مع تطبيقات عملية",
    price: "12,000 دج",
    level: "متقدم"
  },
  {
    id: 3,
    title: "اللغة الإنجليزية للمبتدئين",
    module: "اللغات",
    year: "جميع المستويات",
    duration: "4 أشهر",
    students: 30,
    description: "تعلم أساسيات اللغة الإنجليزية من الصفر",
    price: "8,000 دج",
    level: "مبتدئ"
  },
  {
    id: 4,
    title: "الحساب الذهني السوروبان",
    module: "الحساب الذهني",
    year: "من 6 إلى 12 سنة",
    duration: "6 أشهر",
    students: 15,
    description: "تطوير مهارات الحساب الذهني باستخدام السوروبان",
    price: "10,000 دج",
    level: "مبتدئ"
  },
  {
    id: 5,
    title: "علوم الطبيعة والحياة",
    module: "العلوم الطبيعية",
    year: "السنة الثانية ثانوي",
    duration: "3 أشهر",
    students: 22,
    description: "دروس تقوية في البيولوجيا والجيولوجيا",
    price: "11,000 دج",
    level: "متوسط"
  },
  {
    id: 6,
    title: "اللغة الفرنسية",
    module: "اللغات",
    year: "السنة الأولى ثانوي",
    duration: "4 أشهر",
    students: 28,
    description: "تحسين مهارات التواصل باللغة الفرنسية",
    price: "9,000 دج",
    level: "متوسط"
  }
];

const Courses = () => {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [moduleFilter, setModuleFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const modules = [...new Set(courses.map(course => course.module))];
  const years = [...new Set(courses.map(course => course.year))];

  const applyFilters = (module: string, year: string) => {
    let filtered = courses;
    
    if (module !== "all") {
      filtered = filtered.filter(course => course.module === module);
    }
    
    if (year !== "all") {
      filtered = filtered.filter(course => course.year === year);
    }
    
    setFilteredCourses(filtered);
  };

  const handleModuleFilter = (value: string) => {
    setModuleFilter(value);
    applyFilters(value, yearFilter);
  };

  const handleYearFilter = (value: string) => {
    setYearFilter(value);
    applyFilters(moduleFilter, value);
  };

  const resetFilters = () => {
    setModuleFilter("all");
    setYearFilter("all");
    setFilteredCourses(courses);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            دوراتنا التعليمية
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من الدورات التعليمية المصممة لتلبية احتياجاتك الأكاديمية
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">فلترة الدورات</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">المادة</label>
              <Select value={moduleFilter} onValueChange={handleModuleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المادة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المواد</SelectItem>
                  {modules.map(module => (
                    <SelectItem key={module} value={module}>{module}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">السنة الدراسية</label>
              <Select value={yearFilter} onValueChange={handleYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع السنوات</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                إعادة تعيين الفلاتر
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            عدد الدورات المتاحة: <span className="font-semibold text-primary">{filteredCourses.length}</span>
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{course.module}</Badge>
                  <Badge variant="outline">{course.year}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 ml-2" />
                    <span>المدة: {course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 ml-2" />
                    <span>عدد الطلاب: {course.students}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 ml-2" />
                    <span>السعر: {course.price}</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  انضم الآن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">لا توجد دورات متاحة</h3>
            <p className="text-muted-foreground mb-4">
              لم نجد أي دورات تطابق معايير البحث المحددة
            </p>
            <Button onClick={resetFilters}>
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Courses;