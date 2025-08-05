import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, GraduationCap, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import axiosPrivate from "@/api/axios";
import { Subject } from "@/lib/type";
import { useTeacherSearch } from "@/features/Teachers/useTeacherSearch";
import { useEffect, useState } from "react";
import { useTeachers } from "@/features/Teachers/useTeachers";
import { RESULTS_PER_PAGE } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const useSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/api/v1/subjects");
      return data.data as Subject[];
    },
  });
};
const Teachers = () => {
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm, setSearchTerm, debounced } = useTeacherSearch();
  const { data, isLoading, isError } = useTeachers({
    search: debounced,
    subject: subjectFilter,
    page: currentPage,
    limit: RESULTS_PER_PAGE,
  });
  const { data: subjectsData } = useSubjects();
  const teachers = data?.teachers || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / RESULTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [subjectFilter, debounced]);
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">فريق التدريس</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تعرف على نخبة من الأساتذة المتميزين الذين يقدمون أفضل التعليم
            والتوجيه لطلابنا
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>البحث والتصفية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="البحث بالاسم أو رقم الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التخصصات</SelectItem>
                  {subjectsData?.map((subj: Subject) => (
                    <SelectItem key={subj.id} value={subj.name}>
                      {subj.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <p className="text-center my-10 text-lg ">جاري التحميل...</p>
        )}
        {isError && <p className="text-center text-red-500">حدث خطأ ما</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={teacher.imageUrl} alt={teacher.name} />{" "}
                    <AvatarFallback className="text-lg">
                      {teacher.name.split(" ")[0].charAt(0) +
                        teacher.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl text-primary">
                  {teacher.name}
                </CardTitle>
                {/* <p className="text-accent font-medium">{teacher.speciality}</p> */}
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                <p
                  className="text-muted-foreground leading-relaxed whitespace-break-spaces line-clamp-2"
                  title={teacher.bio}
                >
                  {teacher.bio}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-sm">
                    <GraduationCap className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">التعليم:</span>
                    <span className="text-muted-foreground">
                      {teacher.education || "غير مذكور"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Award className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">الخبرة:</span>
                    <span className="text-muted-foreground">
                      {teacher.experience}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">البريد:</span>
                    <span className="text-muted-foreground">
                      {teacher.email}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 ml-2 text-primary" />
                    <span className="font-medium ml-2">الهاتف:</span>
                    <span className="text-muted-foreground">
                      {teacher.phone}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">المواد التي يدرسها:</h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={subject.id} variant="secondary">
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {teacher.achievements.length !== 0 && (
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
                )}
              </CardContent>
              {/* <CardFooter>
                <Button className="w-full mt-4">تواصل مع الأستاذ</Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>

        {!isLoading && teachers.length === 0 && (
          <div className="text-center my-10 text-lg text-muted-foreground">
            لا يوجد أساتذة مطابقين للبحث أو التصفية الحالية.
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center bg-white w-fit mx-auto px-8 py-2 rounded-lg shadow-md my-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  >
                    السابق
                  </PaginationLink>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
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
      </div>
      <Footer />
    </div>
  );
};

export default Teachers;
