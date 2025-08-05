import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, ArrowLeft, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import { useQuery } from "@tanstack/react-query";
import axiosPrivate from "@/api/axios";
import { Course, Registration } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const {
    data: course,
    isLoading,
    error,
  } = useQuery<Course>({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosPrivate(`/api/v1/courses/${id}`);
      return res.data.data as Course;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
        </div>
        <Footer />
      </div>
    );
  }
  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              الدورة غير موجودة
            </h1>
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
                    <CardTitle className="text-2xl mb-2">
                      {course.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{course.subject.name}</Badge>
                      <Badge variant="outline">{course.level.name}</Badge>
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
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {course.price}دج
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-break-spaces">
                  {course.description}
                </p>
              </CardContent>
            </Card>

            {/* Teacher Info */}
            <Card>
              <CardHeader>
                <CardTitle>المدرس</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-2 mb-3 flex-wrap">
                  {course.teachers.map((teacher) => (
                    <div key={teacher.name} className="flex items-center gap-3">
                      <Avatar className="w-14 h-14 ">
                        <AvatarImage
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          className="rounded-full"
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
                        <p className="text-xs text-muted-foreground">المدرس</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {course.status !== "COMPLETED" && (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>التسجيل في الدورة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {course.price} دج
                    </div>
                    <p className="text-sm text-muted-foreground">
                      سعر الدورة الكاملة
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowRegistrationForm(true)}
                  >
                    سجل الآن
                  </Button>
                </CardContent>
              </Card>
            )}
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
