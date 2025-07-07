import { Account } from "./account";
import { Transaction } from "./transaction";

export class Summary {
  totalAccounts: number = 0;
  totalViewers: number = 0;
  totalViewees: number = 0;
  totalTransactions: number = 0;
  totalDebitTransactions: number = 0;
  totalCreditTransactions: number = 0;
  totalSelfDeductTransactions: number = 0;
  totalDebit: string = "0";
  totalCredit: string = "0";
  totalBalance: string = "0";
  totalInvestments: string = "0";
  totalBankBalance: string = "0";
  totalOtherBalance: string = "0";
  totalCashBalance: string = "0";
  accounts: Array<Account> = [];
  transactions: Array<Transaction> = [];
}
