import { Account } from "./account";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: string;
  visible: boolean;
  status: TransactionStatus;
  message: string;
  note: string;
  category: string;
  timestamp: Date;
  account1: Account;
  account2: Account | null;
}

export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  SELF_DEDUCT = "SELF_DEDUCT",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface CreateTransactionDto {
  type: TransactionType;

  amount: string;

  visible?: boolean;

  status: TransactionStatus;

  message: string;

  note?: string;

  category?: string;

  account1: string;

  account2?: string;
}

// export const TransactionStatusColorMap: Record<TransactionStatus, string> = {
//   PENDING: "text-yellow-400",
//   COMPLETED: "text-green-400",
// };
export const TransactionStatusColorMap: Record<
  TransactionStatus,
  { text: string; bgColor: string }
> = {
  [TransactionStatus.PENDING]: {
    text: "text-yellow-300",
    bgColor: "bg-yellow-900",
  },
  [TransactionStatus.COMPLETED]: {
    text: "text-green-300",
    bgColor: "bg-green-900",
  },
};
