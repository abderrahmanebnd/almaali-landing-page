import { useState } from "react";
import { Plus, Search, Edit, Trash2, Clock, User } from "lucide-react";
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

interface Registration {
  id: number;
  studentName: string;
  courseType: string;
  preferredTime: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  registrationDate: string;
}

const Registrations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [registrations] = useState<Registration[]>([
    {
      id: 1,
      studentName: "أحمد محمد علي",
      courseType: "دروس الرياضيات",
      preferredTime: "صباحاً 9:00-11:00",
      notes: "يحتاج إلى تركيز إضافي في الجبر",
      status: "confirmed",
      registrationDate: "2024-02-15"
    },
    {
      id: 2,
      studentName: "فاطمة حسن أحمد",
      courseType: "اللغة الإنجليزية",
      preferredTime: "مساءً 4:00-6:00",
      notes: "مبتدئة في اللغة",
      status: "pending",
      registrationDate: "2024-02-16"
    },
    {
      id: 3,
      studentName: "يوسف عبد الرحمن",
      courseType: "الحساب الذهني (سوروبان)",
      preferredTime: "مساءً 2:00-4:00",
      notes: "لديه اهتمام كبير بالحساب الذهني",
      status: "confirmed",
      registrationDate: "2024-02-17"
    },
    {
      id: 4,
      studentName: "سارة محمود",
      courseType: "دروس الدعم والتقوية",
      preferredTime: "صباحاً 10:00-12:00",
      notes: "تحتاج دعم في عدة مواد",
      status: "cancelled",
      registrationDate: "2024-02-18"
    },
    {
      id: 5,
      studentName: "محمد أمين الطاهر",
      courseType: "اللغة الفرنسية",
      preferredTime: "مساءً 5:00-7:00",
      notes: "يريد تحسين مستواه للبكالوريا",
      status: "pending",
      registrationDate: "2024-02-19"
    }
  ]);

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = registration.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === "all" || registration.courseType === courseFilter;
    const matchesStatus = statusFilter === "all" || registration.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const courseTypes = ["دروس الرياضيات", "اللغة الإنجليزية", "اللغة الفرنسية", "الحساب الذهني (سوروبان)", "دروس الدعم والتقوية"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">مؤكد</Badge>;
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغى</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">إدارة التسجيلات</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="ml-2 h-4 w-4" />
          تسجيل جديد
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
                placeholder="البحث باسم الطالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="نوع الدورة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدورات</SelectItem>
                {courseTypes.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="confirmed">مؤكد</SelectItem>
                <SelectItem value="cancelled">ملغى</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Registrations Cards for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredRegistrations.map((registration) => (
          <Card key={registration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{registration.studentName}</CardTitle>
                {getStatusBadge(registration.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium">{registration.courseType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{registration.preferredTime}</span>
                </div>
              </div>
              {registration.notes && (
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {registration.notes}
                </p>
              )}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  {registration.registrationDate}
                </span>
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

      {/* Registrations Table for larger screens */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>قائمة التسجيلات ({filteredRegistrations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم الطالب</TableHead>
                  <TableHead className="text-right">نوع الدورة</TableHead>
                  <TableHead className="text-right">الوقت المفضل</TableHead>
                  <TableHead className="text-right">ملاحظات</TableHead>
                  <TableHead className="text-right">تاريخ التسجيل</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.studentName}</TableCell>
                    <TableCell>{registration.courseType}</TableCell>
                    <TableCell>{registration.preferredTime}</TableCell>
                    <TableCell className="max-w-48 truncate" title={registration.notes}>
                      {registration.notes}
                    </TableCell>
                    <TableCell>{registration.registrationDate}</TableCell>
                    <TableCell>
                      {getStatusBadge(registration.status)}
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

export default Registrations;