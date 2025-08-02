import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";

interface Course {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  assignedTeachers: string[];
  status: "Active" | "Inactive";
  createdAt: string;
}

interface CourseFormData {
  title: string;
  description: string;
  type: string;
  level: string;
  assignedTeachers: string[];
  status: boolean;
}

const AdminCourses = () => {
  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "اللغة الإنجليزية للمبتدئين",
      description: "دورة تعليم اللغة الإنجليزية من الأساسيات",
      type: "Language",
      level: "Primary",
      assignedTeachers: ["أ. سارة أحمد", "أ. محمد علي"],
      status: "Active",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      title: "الرياضيات المتقدمة",
      description: "دورة تقوية في الرياضيات للمرحلة الثانوية",
      type: "Support",
      level: "Secondary",
      assignedTeachers: ["أ. أحمد محمود"],
      status: "Active",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      title: "السوروبان للأطفال",
      description: "تعليم السوروبان وتطوير مهارات الحساب الذهني",
      type: "Training",
      level: "Primary",
      assignedTeachers: ["أ. فاطمة حسن"],
      status: "Inactive",
      createdAt: "2024-02-01"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<CourseFormData>();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || course.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const onSubmit = (data: CourseFormData) => {
    console.log("Course data:", data);
    setIsDialogOpen(false);
    setEditingCourse(null);
    reset();
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setValue("title", course.title);
    setValue("description", course.description);
    setValue("type", course.type);
    setValue("level", course.level);
    setValue("assignedTeachers", course.assignedTeachers);
    setValue("status", course.status === "Active");
    setIsDialogOpen(true);
  };

  const handleDelete = (courseId: string) => {
    console.log("Delete course:", courseId);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Language": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Support": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Training": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Primary": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Middle": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Secondary": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">إدارة الدورات</h1>
            <p className="text-muted-foreground">إدارة جميع دورات الأكاديمية</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingCourse(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة دورة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "تعديل الدورة" : "إضافة دورة جديدة"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الدورة</Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="أدخل عنوان الدورة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: true })}
                  placeholder="أدخل وصف الدورة"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">نوع الدورة</Label>
                  <Select onValueChange={(value) => setValue("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Language">لغات</SelectItem>
                      <SelectItem value="Support">تقوية</SelectItem>
                      <SelectItem value="Training">تدريب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">المستوى</Label>
                  <Select onValueChange={(value) => setValue("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primary">ابتدائي</SelectItem>
                      <SelectItem value="Middle">متوسط</SelectItem>
                      <SelectItem value="Secondary">ثانوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTeachers">الأساتذة المعينون</Label>
                <Input
                  id="assignedTeachers"
                  placeholder="أسماء الأساتذة مفصولة بفاصلة"
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="status"
                  {...register("status")}
                />
                <Label htmlFor="status">الدورة نشطة</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingCourse ? "تحديث" : "إضافة"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCourse(null);
                    reset();
                  }}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في الدورات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية بالحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية بالنوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="language">لغات</SelectItem>
                <SelectItem value="support">تقوية</SelectItem>
                <SelectItem value="training">تدريب</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الدورات ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الوصف</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">المستوى</TableHead>
                  <TableHead className="text-right">الأساتذة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{course.description}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(course.type)}>
                        {course.type === "Language" ? "لغات" : 
                         course.type === "Support" ? "تقوية" : "تدريب"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level === "Primary" ? "ابتدائي" : 
                         course.level === "Middle" ? "متوسط" : "ثانوي"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {course.assignedTeachers.map((teacher, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {teacher}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={course.status === "Active" ? "default" : "secondary"}
                        className={course.status === "Active" ? 
                          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        }
                      >
                        {course.status === "Active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(course)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(course.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourses;