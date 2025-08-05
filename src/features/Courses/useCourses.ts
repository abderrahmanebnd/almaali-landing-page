import axiosPrivate from "@/api/axios";
import { Course, CourseQuery } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export const useCourses = ({
  search,
  subject,
  level,
  status,
  page,
  limit,
}: CourseQuery) => {
  return useQuery({
    queryKey: ["courses", { search, subject, level, status, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (subject && subject !== "all") params.append("subject", subject);
      if (level && level !== "all") params.append("level", level);
      if (status && status !== "all") params.append("status", status);
      if (page) params.append("page", String(page));
      if (limit) params.append("limit", String(limit));

      const { data } = await axiosPrivate.get(
        `/api/v1/courses?${params.toString()}`
      );
      const {
        data: courses,
        pagination: { currentPage, totalCount, totalPages },
      } = data.data;

      return {
        courses: courses as Course[],
        totalCount,
        currentPage,
        totalPages,
      };
    },
  });
};
