import { useState } from "react";
import { Plus, Search, Edit, Trash2, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useForm } from "react-hook-form";

interface Teacher {
  id: number;
  name: string;
  phone: string;
  subject: string;
  addedDate: string;
  experience: string;
  photo: string;
  status: "active" | "inactive";
}

interface TeacherFormData {
  name: string;
  phone: string;
  subject: string;
  experience: string;
  status: boolean;
}

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const itemsPerPage = 6;

  const { register, handleSubmit, reset, setValue } = useForm<TeacherFormData>();

  const [teachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "د. سارة أحمد محمد",
      phone: "0791234567",
      subject: "الرياضيات",
      addedDate: "2023-09-01",
      experience: "5 سنوات",
      photo: "/placeholder.svg",
      status: "active"
    },
    {
      id: 2,
      name: "أ. محمد علي حسن",
      phone: "0797654321",
      subject: "اللغة العربية",
      addedDate: "2023-09-15",
      experience: "8 سنوات",
      photo: "/placeholder.svg",
      status: "active"
    },
    {
      id: 3,
      name: "أ. نور الدين يوسف",
      phone: "0791122334",
      subject: "العلوم الطبيعية",
      addedDate: "2023-10-01",
      experience: "3 سنوات",
      photo: "/placeholder.svg",
      status: "active"
    },
    {
      id: 4,
      name: "أ. فاطمة الزهراء",
      phone: "0795566778",
      subject: "اللغة الإنجليزية",
      addedDate: "2023-11-01",
      experience: "6 سنوات",
      photo: "/placeholder.svg",
      status: "inactive"
    },
    {
      id: 5,
      name: "أ. عبد الله منصور",
      phone: "0798899001",
      subject: "الحساب الذهني",
      addedDate: "2024-01-15",
      experience: "4 سنوات",
      photo: "/placeholder.svg",
      status: "active"
    }
  ]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.phone.includes(searchTerm);
    const matchesSubject = subjectFilter === "all" || teacher.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  const onSubmit = (data: TeacherFormData) => {
    console.log("Teacher data:", data);
    setIsDialogOpen(false);
    setEditingTeacher(null);
    reset();
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setValue("name", teacher.name);
    setValue("phone", teacher.phone);
    setValue("subject", teacher.subject);
    setValue("experience", teacher.experience);
    setValue("status", teacher.status === "active");
    setIsDialogOpen(true);
  };

  const handleDelete = (teacherId: number) => {
    console.log("Delete teacher:", teacherId);
  };

  const subjects = ["الرياضيات", "اللغة العربية", "اللغة الإنجليزية", "العلوم الطبيعية", "الحساب الذهني"];

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">إدارة الأساتذة</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingTeacher(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="ml-2 h-4 w-4" />
              إضافة أستاذ جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? "تعديل الأستاذ" : "إضافة أستاذ جديد"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: true })}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">التخصص</Label>
                <Select onValueChange={(value) => setValue("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">سنوات الخبرة</Label>
                <Input
                  id="experience"
                  {...register("experience", { required: true })}
                  placeholder="مثال: 5 سنوات"
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="status"
                  {...register("status")}
                />
                <Label htmlFor="status">الأستاذ نشط</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingTeacher ? "تحديث" : "إضافة"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingTeacher(null);
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
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
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
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={teacher.photo} alt={teacher.name} />
                <AvatarFallback className="text-lg">
                  {teacher.name.split(' ')[0].charAt(0) + teacher.name.split(' ')[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{teacher.name}</CardTitle>
              <Badge variant="outline" className="w-fit mx-auto">
                {teacher.subject}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>انضم في {teacher.addedDate}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">الخبرة: </span>
                <span className="text-muted-foreground">{teacher.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge 
                  variant={teacher.status === "active" ? "default" : "secondary"}
                >
                  {teacher.status === "active" ? "نشط" : "غير نشط"}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(teacher)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(teacher.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teachers Table for larger screens */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>جدول الأساتذة ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الأستاذ</TableHead>
                  <TableHead className="text-right">رقم الهاتف</TableHead>
                  <TableHead className="text-right">التخصص</TableHead>
                  <TableHead className="text-right">الخبرة</TableHead>
                  <TableHead className="text-right">تاريخ الانضمام</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={teacher.photo} alt={teacher.name} />
                          <AvatarFallback className="text-xs">
                            {teacher.name.split(' ')[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.subject}</Badge>
                    </TableCell>
                    <TableCell>{teacher.experience}</TableCell>
                    <TableCell>{teacher.addedDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={teacher.status === "active" ? "default" : "secondary"}
                      >
                        {teacher.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(teacher)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(teacher.id)}>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Teachers;