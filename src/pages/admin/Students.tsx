import { useState } from "react";
import { Plus, Search, Edit, Trash2, Users } from "lucide-react";
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
import { cn } from "@/lib/utils";
interface Student {
  id: number;
  name: string;
  phone: string;
  level: string;
  registrationDate: string;
  status: "active" | "inactive";
}

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const [students] = useState<Student[]>([
    {
      id: 1,
      name: "أحمد محمد علي",
      phone: "0791234567",
      level: "ابتدائي",
      registrationDate: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "فاطمة حسن أحمد",
      phone: "0797654321",
      level: "متوسط",
      registrationDate: "2024-01-20",
      status: "active"
    },
    {
      id: 3,
      name: "يوسف عبد الرحمن",
      phone: "0791122334",
      level: "ثانوي",
      registrationDate: "2024-02-01",
      status: "inactive"
    },
    {
      id: 4,
      name: "سارة محمود",
      phone: "0795566778",
      level: "ابتدائي",
      registrationDate: "2024-02-10",
      status: "active"
    },
    {
      id: 5,
      name: "محمد أمين الطاهر",
      phone: "0798899001",
      level: "متوسط",
      registrationDate: "2024-02-15",
      status: "active"
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    const matchesLevel = levelFilter === "all" || student.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const levels = ["ابتدائي", "متوسط", "ثانوي"];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الطلاب</h1>
          <p className="text-muted-foreground mt-1">إدارة وتتبع جميع الطلاب المسجلين</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="ml-2 h-4 w-4" />
          إضافة طالب جديد
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            البحث والتصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث بالاسم أو رقم الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-background border-border focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border">
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border shadow-lg z-50">
                <SelectItem value="all">جميع المستويات</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              قائمة الطلاب ({filteredStudents.length})
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {filteredStudents.length} طالب
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-right font-semibold">الاسم</TableHead>
                  <TableHead className="text-right font-semibold">رقم الهاتف</TableHead>
                  <TableHead className="text-right font-semibold">المستوى</TableHead>
                  <TableHead className="text-right font-semibold">تاريخ التسجيل</TableHead>
                  <TableHead className="text-right font-semibold">الحالة</TableHead>
                  <TableHead className="text-right font-semibold">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={student.id} className={cn(
                    "border-border hover:bg-muted/40 transition-colors",
                    index % 2 === 0 ? "bg-background/50" : "bg-muted/10"
                  )}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.level}</Badge>
                    </TableCell>
                    <TableCell>{student.registrationDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === "active" ? "default" : "secondary"}
                      >
                        {student.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
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

export default Students;