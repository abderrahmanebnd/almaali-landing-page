import axiosPrivate from "@/api/axios";
import { Level } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export default function useLevels() {
  const { data: levels = [] } = useQuery<Level[]>({
    queryKey: ["levels"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/api/v1/levels");
      return res.data.data;
    },
  });

  return levels;
}
