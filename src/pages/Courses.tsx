import { useEffect, useState } from "react";
import { useCourses } from "@/features/Courses/useCourses";
import { useCoursesSearch } from "@/features/Courses/useCoursesSearch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course, Level } from "@/lib/type";
import CourseDialog from "@/features/Courses/CourseDialog";
import axiosPrivate from "@/api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { RESULTS_PER_PAGE, statusOptions } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLevels from "@/features/Levels/useLevels";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RegistrationForm from "@/components/RegistrationForm";

export default function Courses() {
  const levels = useLevels();

  const [status, setStatus] = useState("ACTIVE");
  const [level, setLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { searchTerm, setSearchTerm, debounced } = useCoursesSearch();

  const { data, isLoading, refetch } = useCourses({
    search: debounced,
    status,
    subject: "all",
    level,
    page,
    limit: RESULTS_PER_PAGE,
  });

  const courses = data?.courses || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [status, level, debounced]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8" dir="rtl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            دوراتنا التعليمية
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            اكتشف مجموعة واسعة من الدورات التعليمية المصممة لتلبية احتياجاتك
            الأكاديمية
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والتصفية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center justify-start">
              <Input
                className="bg-gray-100 border border-gray-300 flex-1"
                placeholder="عنوان الدورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                onValueChange={(val) => setStatus(val)}
                defaultValue="ACTIVE"
              >
                <SelectTrigger className="w-[180px] bg-gray-100 border border-gray-300">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt === "all"
                        ? "الحالة"
                        : opt === "ACTIVE"
                        ? "نشطة"
                        : opt === "COMPLETED"
                        ? "مكتملة"
                        : "لم تبدأ"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => setLevel(val)} defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-100 border border-gray-300">
                  <SelectValue placeholder="المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المستويات</SelectItem>
                  {levels.map((lvl: Level) => (
                    <SelectItem key={lvl.id} value={lvl.name}>
                      {lvl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses */}
        <div className="p-6 space-y-6">
          <div className="rounded-md border overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow duration-200 flex flex-col"
                >
                  <img
                    src={course.imageUrl || "/images/fallback-course.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // prevent infinite loop
                      target.src = "/images/fallback-course.svg";
                    }}
                  />

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <Badge
                        className={cn(
                          "capitalize text-xm ",
                          course.status === "ACTIVE"
                            ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
                            : course.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        )}
                      >
                        {course.status === "ACTIVE"
                          ? "نشطة"
                          : course.status === "COMPLETED"
                          ? "مكتملة"
                          : "لم تبدأ"}
                      </Badge>
                    </div>

                    {/* Teacher Info */}
                    <div className="flex flex-col gap-2 mb-3">
                      {course.teachers.map((teacher) => (
                        <div
                          key={teacher.name}
                          className="flex items-center gap-3"
                        >
                          <Avatar className="w-14 h-14">
                            <AvatarImage
                              src={teacher.imageUrl}
                              alt={teacher.name}
                            />
                            <AvatarFallback className="text-lg">
                              {teacher.name.split(" ")[0].charAt(0) +
                                teacher.name.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-primary">
                              {teacher.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              المدرس
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{course.subject.name}</Badge>
                      <Badge variant="outline">{course.level.name}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4 whitespace-break-spaces line-clamp-3">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-muted-foreground flex items-center  ">
                      <BookOpen className="size-4 ml-2 block mt-2" />
                      <span>السعر: {course.price} دج</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-col sm:flex-row w-full gap-2   ">
                      {course.status !== "COMPLETED" && (
                        <Button
                          variant="outline"
                          className="w-full hover:bg-primary hover:text-white transition-colors"
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowRegistrationForm(true);
                          }}
                        >
                          سجل الآن
                        </Button>
                      )}
                      <Link className="flex-1" to={`/courses/${course.id}`}>
                        <Button className="w-full">المزيد من التفاصيل</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    >
                      السابق
                    </PaginationLink>
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pg) => (
                      <PaginationItem key={pg}>
                        <PaginationLink
                          onClick={() => setPage(pg)}
                          isActive={pg === page}
                          className="cursor-pointer"
                        >
                          {pg}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    >
                      التالي
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Empty State */}
          {isLoading && (
            <div className="flex flex-col items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">
                جاري تحميل الدورات...
              </h3>
              <p className="text-muted-foreground">
                يرجى الانتظار بينما نقوم بجلب البيانات
              </p>
            </div>
          )}
          {!isLoading && courses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">
                لا توجد دورات متاحة
              </h3>
              <p className="text-muted-foreground mb-4">
                لم نجد أي دورات تطابق معايير البحث المحددة
              </p>
              {/* <Button>إعادة تعيين الفلاتر</Button> */}
            </div>
          )}
        </div>
      </div>
      {showRegistrationForm && (
        <RegistrationForm
          course={selectedCourse}
          onClose={() => setShowRegistrationForm(false)}
        />
      )}
      <Footer />
    </div>
  );
}

// const Courses = () => {
//   const [filteredCourses, setFilteredCourses] = useState(courses);
//   const [moduleFilter, setModuleFilter] = useState("all");
//   const [yearFilter, setYearFilter] = useState("all");

//   const modules = [...new Set(courses.map(course => course.module))];
//   const years = [...new Set(courses.map(course => course.year))];

//   const applyFilters = (module: string, year: string) => {
//     let filtered = courses;

//     if (module !== "all") {
//       filtered = filtered.filter(course => course.module === module);
//     }

//     if (year !== "all") {
//       filtered = filtered.filter(course => course.year === year);
//     }

//     setFilteredCourses(filtered);
//   };

//   const handleModuleFilter = (value: string) => {
//     setModuleFilter(value);
//     applyFilters(value, yearFilter);
//   };

//   const handleYearFilter = (value: string) => {
//     setYearFilter(value);
//     applyFilters(moduleFilter, value);
//   };

//   const resetFilters = () => {
//     setModuleFilter("all");
//     setYearFilter("all");
//     setFilteredCourses(courses);
//   };

//   return (
//     <div className="min-h-screen bg-background" dir="rtl">
//       <Navbar />

//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-primary mb-4">
//             دوراتنا التعليمية
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             اكتشف مجموعة واسعة من الدورات التعليمية المصممة لتلبية احتياجاتك الأكاديمية
//           </p>
//         </div>

//         {/* Filters */}

//         {/* Results Summary */}
//         <div className="mb-6">
//           <p className="text-muted-foreground">
//             عدد الدورات المتاحة: <span className="font-semibold text-primary">{filteredCourses.length}</span>
//           </p>
//         </div>

//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Courses;
