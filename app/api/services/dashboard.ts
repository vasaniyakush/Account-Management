import { useQuery } from "@tanstack/react-query";
import axios from "@/app/api/request";
import { Summary } from "@/app/types/summary";

export const fetchDashboardData = async (token: string) => {
  //@ts-ignore
  console.log("AUTH TOKEN", token);
  const response = await axios.get("/users/summary", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.data as Summary;
};

export const useDashboardData = (token: string, runFunction: boolean) => {
  return useQuery({
    queryKey: ["accounts", "transactions"],
    queryFn: () => fetchDashboardData(token),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: runFunction && token !== "",
    staleTime: 1000 * 60 * 60, // 5 minutes
  });
};
