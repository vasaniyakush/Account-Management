import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/app/api/request";
import { Summary } from "@/app/types/summary";
import { Account } from "@/app/types/account";

export const fetchAccounts = async (token: string) => {
  //@ts-ignore
  console.log("AUTH TOKEN", token);
  const response = await axios.get("/accounts", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Failed to fetch accounts data");
  }

  return response.data as Account[];
};

export const createAccount = async (token: string, accountName: string) => {};

export const useAccounts = (token: string, runFunction: boolean) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => fetchAccounts(token),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: runFunction && token !== "",
    staleTime: 1000 * 60 * 60, // 5 minutes
  });
};

// export const useCreateAccount = (token: string, runFunction: boolean) => {
//   return useMutation({
//     mutationFn:(account: string) => createAccount(token, accountName),
//   })
// };
