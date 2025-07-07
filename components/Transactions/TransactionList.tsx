import { Transaction } from "@/app/types/transaction";
import TransactionCard from "./TransactionCard";

export default function TransactionList({
  transactions,
  showBalance,
}: {
  transactions: Array<Transaction>;
  showBalance: boolean;
}) {
  return (
    <>
      {transactions?.map((transaction) => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        );
      })}
    </>
    // <div className="flex flex-col gap-4">
    //   {transactions.map((transaction) => (
    //     <div
    //       key={transaction.id}
    //       className="bg-gradient-to-br from-gray-800/30 to-white-800/30 p-4 rounded-lg shadow-lg border border-purple-100 backdrop-blur-md transition-shadow hover:shadow-white-600/40 duration-300 text-white max-w-xl mx-auto"
    //     >
    //       <div className="flex justify-between items-center">
    //         <div className="text-lg font-semibold text-purple-200">
    //           {transaction.message}
    //         </div>
    //         <span
    //           className={`${
    //             transaction.type === "DEBIT"
    //               ? "text-red-400"
    //               : transaction.type === "CREDIT"
    //               ? "text-green-400"
    //               : "text-yellow-400"
    //           }`}
    //         >
    //           {transaction.type}
    //         </span>
    //       </div>
    //       <div className="text-purple-300 inline text-sm mt-1">
    //         {showBalance ? `₹${transaction.amount}` : "₹*******"}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
