import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "إجمالي الطلاب",
      value: "243",
      icon: Users,
      trend: "+12% من الشهر الماضي"
    },
    {
      title: "إجمالي الأساتذة",
      value: "18",
      icon: GraduationCap,
      trend: "+2 أساتذة جدد"
    },
    {
      title: "الدورات النشطة",
      value: "32",
      icon: BookOpen,
      trend: "8 دورات جديدة"
    },
    {
      title: "التسجيلات اليوم",
      value: "7",
      icon: Calendar,
      trend: "+3 تسجيلات جديدة"
    }
  ];

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخر التسجيلات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "أحمد محمد", course: "دروس الرياضيات", time: "منذ ساعة" },
              { name: "فاطمة علي", course: "اللغة الإنجليزية", time: "منذ ساعتين" },
              { name: "يوسف حسن", course: "الحساب الذهني", time: "منذ 3 ساعات" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.course}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الأساتذة النشطون</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "د. سارة أحمد", subject: "الرياضيات", students: "24 طالب" },
              { name: "أ. محمد علي", subject: "اللغة العربية", students: "18 طالب" },
              { name: "أ. نور الدين", subject: "العلوم", students: "21 طالب" }
            ].map((teacher, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{teacher.name}</p>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground">{teacher.students}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;