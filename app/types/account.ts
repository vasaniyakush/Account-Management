export interface Account {
  id: string;

  name: string;

  note: string;

  balance: string;

  accountType: AccountType;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

  user: string;

  isVisible: boolean;
}

export enum AccountType {
  BANK = "BANK",
  INVESTMENT = "INVESTMENT",
  OTHER = "OTHER",
  CASH = "CASH",
}

export const accountTypeColorMap: Record<
  AccountType,
  { text: string; bgColor: string }
> = {
  [AccountType.BANK]: { text: "text-blue-300", bgColor: "bg-blue-900" },
  [AccountType.INVESTMENT]: { text: "text-green-300", bgColor: "bg-green-900" },
  [AccountType.OTHER]: { text: "text-yellow-300", bgColor: "bg-yellow-900" },
  [AccountType.CASH]: { text: "text-purple-300", bgColor: "bg-purple-900" },
};
