import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface Course {
  id: number;
  title: string;
  module: string;
  year: string;
  duration: string;
  students: number;
  description: string;
  price: string;
  level: string;
  teacher: {
    name: string;
    photo: string;
  };
}

interface Level {
  id: string;
  name: string;
  description?: string;
}

type RegistrationStatus = "pending" | "approved" | "rejected" | "cancelled";

const registrationSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(10, "رقم الهاتف مطلوب"),
  levelId: z.string().optional(),
  notes: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  course: Course;
  onClose: () => void;
}

// Sample levels data (in a real app, this would come from an API)
const levels: Level[] = [
  { id: "1", name: "السنة الأولى ثانوي", description: "المستوى الأول" },
  { id: "2", name: "السنة الثانية ثانوي", description: "المستوى الثاني" },
  { id: "3", name: "السنة الثالثة ثانوي", description: "المستوى الثالث" },
  { id: "4", name: "السنة الأولى متوسط", description: "المتوسط الأول" },
  { id: "5", name: "السنة الثانية متوسط", description: "المتوسط الثاني" },
  { id: "6", name: "السنة الثالثة متوسط", description: "المتوسط الثالث" },
  { id: "7", name: "السنة الرابعة متوسط", description: "المتوسط الرابع" },
];

const RegistrationForm = ({ course, onClose }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      levelId: "",
      notes: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const registrationData = {
        ...data,
        courseId: course.id.toString(),
        createdAt: new Date().toISOString(),
        status: "pending" as RegistrationStatus,
        Course: course,
        Level: data.levelId ? levels.find(l => l.id === data.levelId) : undefined,
      };

      console.log("Registration submitted:", registrationData);
      
      toast({
        title: "تم التسجيل بنجاح",
        description: "سيتم مراجعة طلبك والتواصل معك قريباً",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "خطأ في التسجيل",
        description: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>التسجيل في الدورة</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Course Summary */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">{course.module}</Badge>
            <Badge variant="outline">{course.year}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">المدة: {course.duration}</span>
            <span className="font-bold text-primary">{course.price}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل *</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسمك الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف *</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل رقم هاتفك" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المستوى الدراسي (اختياري)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستواك الدراسي" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="أي ملاحظات أو أسئلة خاصة..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;