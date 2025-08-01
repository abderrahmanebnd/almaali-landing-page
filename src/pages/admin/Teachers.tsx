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

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

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

  const subjects = ["الرياضيات", "اللغة العربية", "اللغة الإنجليزية", "العلوم الطبيعية", "الحساب الذهني"];

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">إدارة الأساتذة</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="ml-2 h-4 w-4" />
          إضافة أستاذ جديد
        </Button>
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
        {filteredTeachers.map((teacher) => (
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
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
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
                {filteredTeachers.map((teacher) => (
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
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
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

export default Teachers;