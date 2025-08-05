import axiosPrivate from "@/api/axios";
import { Teacher, TeacherQuery } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export const useTeachers = ({ search, subject, page, limit }: TeacherQuery) => {
  return useQuery({
    queryKey: ["teachers", { search, subject, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (subject && subject !== "all") params.append("subject", subject);
      if (page) params.append("page", String(page));
      if (limit) params.append("limit", String(limit));

      const { data } = await axiosPrivate.get(
        `/api/v1/teachers?${params.toString()}`
      );
      const {
        teachers,
        pagination: { currentPage, totalCount, totalPages },
      } = data;

      return {
        teachers: teachers as Teacher[],
        totalCount,
        currentPage,
        totalPages,
      };
    },
  });
};
