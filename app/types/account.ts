export interface Account {
  id: string;

  name: string;

  note: string;

  balance: string;

  accountType: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

  user: string;
}
