import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import axiosPrivate from "@/api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Course, Level, Subject, Teacher } from "@/lib/type";
import axios from "axios";
import { displayErrorToast } from "@/components/common/CustomAlert";
import { handleError } from "@/lib/utils";
import { Loader } from "lucide-react";
import useLevels from "../Levels/useLevels";

const schema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  description: z.string().min(1, "الوصف مطلوب").optional(),
  subjectId: z.string().min(1, "اختر تخصصًا"),
  levelId: z.string().min(1, "اختر مستوى"),
  price: z.string().min(1, "السعر مطلوب").optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "NOT_STARTED"]),
  teacherIds: z
    .array(z.string().min(1))
    .min(1, "اختر أستاذًا واحدًا على الأقل"),
  image: z.any().optional(),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editingCourse?: Course | null;
  isEditing?: boolean;
};

function CourseDialog({ isOpen, onClose, editingCourse, isEditing }: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      subjectId: "",
      levelId: "",
      price: "",
      status: "NOT_STARTED",
      teacherIds: [],
      image: null,
    },
  });

  useEffect(() => {
    if (editingCourse) {
      reset(editingCourse);
    } else {
      reset();
    }
  }, [editingCourse, reset]);

  const { data: subjectsData = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/api/v1/subjects");
      return res.data.data;
    },
  });
  const levelsData = useLevels();

  const { data: teachersData = [] } = useQuery({
    queryKey: ["teachers-dropdown"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/api/v1/teachers/name-id");
      return res.data.teachers;
    },
  });
  const queryClient = useQueryClient();
  const internalSubmit = async (data: CourseFormData) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("subjectId", data.subjectId);
      formData.append("levelId", data.levelId);
      formData.append("status", data.status);
      formData.append("price", data.price);
      formData.append("image", data.image[0] || "");
      formData.append("teacherIds", JSON.stringify(data.teacherIds));

      const url = isEditing
        ? `/api/v1/courses/${editingCourse.id}`
        : "/api/v1/courses";
      const method = isEditing ? "patch" : "post";

      await axiosPrivate[method](url, formData);

      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "courses",
      });

      onClose();
      reset();
    } catch (err) {
      displayErrorToast(handleError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {editingCourse ? "تعديل الدورة" : "إضافة دورة جديدة"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(internalSubmit)} className="space-y-4">
          <div>
            <Label>العنوان</Label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label>الوصف</Label>
            <Input {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label>السعر</Label>
            <Input
              {...register("price")}
              placeholder="السعر بالدينار الجزائري"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Label>التخصص</Label>
            <select
              {...register("subjectId")}
              className="w-full border rounded p-2"
            >
              <option value="">اختر تخصصًا</option>
              {subjectsData.map((s: Subject) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.subjectId && (
              <p className="text-red-500 text-sm">{errors.subjectId.message}</p>
            )}
          </div>
          <div>
            <Label>المستوى</Label>
            <select
              {...register("levelId")}
              className="w-full border rounded p-2"
            >
              <option value="">اختر مستوى</option>
              {levelsData.map((l: Level) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            {errors.levelId && (
              <p className="text-red-500 text-sm">{errors.levelId.message}</p>
            )}
          </div>
          <div>
            <Label>الحالة</Label>
            <select
              {...register("status")}
              className="w-full border rounded p-2"
            >
              <option value="NOT_STARTED">لم تبدأ</option>
              <option value="ACTIVE">نشطة</option>
              <option value="COMPLETED">مكتملة</option>
            </select>
          </div>
          <div>
            <Label>الأساتذة</Label>
            <div className="grid gap-2">
              {teachersData.map((t: Teacher) => (
                <label key={t.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={t.id}
                    {...register("teacherIds")}
                    defaultChecked={editingCourse?.teachers?.some(
                      (teacher) => teacher.id === t.id
                    )}
                  />
                  {t.name}
                </label>
              ))}
            </div>
            {errors.teacherIds && (
              <p className="text-red-500 text-sm">
                {errors.teacherIds.message}
              </p>
            )}
          </div>

          <div>
            <Label>صورة</Label>
            <Input type="file" {...register("image")} accept="image/*" />
          </div>
          <Button type="submit" className="w-full">
            {isEditing ? "تحديث" : "إضافة"}
            {isSubmitting && <Loader className="ml-2 animate-spin w-4 h-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CourseDialog;
