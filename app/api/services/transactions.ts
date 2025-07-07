import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/app/api/request";
import { CreateTransactionDto, Transaction } from "@/app/types/transaction";

export const fetchTransactions = async (token: string) => {
  //@ts-ignore
  console.log("AUTH TOKEN", token);
  const response = await axios.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Failed to fetch transactions data");
  }

  return response.data as Transaction[];
};

export const useTransactions = (token: string, runFunction: boolean) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(token),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: runFunction && token !== "",
    staleTime: 1000 * 60 * 60, // 5 minutes
  });
};

export const createTransaction = async (
  token: string,
  transactionBody: CreateTransactionDto
) => {
  const response = await axios.post("/transactions", transactionBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Failed to create account");
  }
  return response.data as Transaction;
};

export const useCreateAccount = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transactionBody: CreateTransactionDto) =>
      createTransaction(token, transactionBody),

    onSuccess: () => {
      // Invalidate and refetch the "accounts" query
      queryClient.invalidateQueries({
        queryKey: ["transactions", "accounts"],
      });
    },

    onError: (error: unknown) => {
      console.error("Create account failed:", error);
    },
  });
};
