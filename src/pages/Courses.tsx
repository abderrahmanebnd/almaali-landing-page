import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLevels from "@/features/Levels/useLevels";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Courses() {
  const levels = useLevels();

  const queryClient = useQueryClient();
  const [status, setStatus] = useState("all");
  const [level, setLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setIsDialogOpen(true);
  };

  const openAdd = () => {
    setEditingCourse(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (courseId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      await axiosPrivate.delete(`/api/v1/courses/${courseId}`);
      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "courses",
      });
      await refetch();
    }
  };

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
                defaultValue="all"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.level.name}</Badge>
                    </div>

                    {/* Teacher Info */}
                    <div className="flex flex-col gap-2 mb-3">
                      {course.teachers.map((teacher) => (
                        <div
                          key={teacher.name}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={teacher.imageUrl}
                            alt={teacher.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
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

                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-muted-foreground flex items-center  ">
                      <BookOpen className="size-4 ml-2 block mt-2" />
                      <span>السعر: {course.price}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row-reverse gap-2">
                      <Link className="flex-1" to={`/courses/${course.id}`}>
                        <Button
                          variant="outline"
                          className="w-full hover:bg-primary hover:text-white transition-colors"
                        >
                          سجل الآن
                        </Button>
                      </Link>
                      <Link className="flex-1" to={`/courses/${course.id}`}>
                        <Button className="w-full">المزيد من التفاصيل</Button>
                      </Link>
                    </div>
                  </CardContent>
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
          {courses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">
                لا توجد دورات متاحة
              </h3>
              <p className="text-muted-foreground mb-4">
                لم نجد أي دورات تطابق معايير البحث المحددة
              </p>
              <Button>إعادة تعيين الفلاتر</Button>
            </div>
          )}
        </div>
      </div>

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
