import { Account } from "@/app/types/account";
import {
  Transaction,
  TransactionStatusColorMap,
} from "@/app/types/transaction";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { formatAmount } from "../utils";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-purple-800/20 to-white-800/30 px-4 py-4 rounded-lg shadow-lg border border-purple-100 backdrop-blur-md hover:shadow-white-600/40 transition-shadow duration-300 text-white max-w-xl my-2 mx-auto"
      >
        <div className="flex justify-between items-start  ">
          <div className="flex flex-row justify-start items-center gap-3">
            <h2 className="text-lg font-bold text-purple-100">
              {transaction.message}
            </h2>
            <span
              className={`${
                TransactionStatusColorMap[transaction.status].bgColor
              } ${
                TransactionStatusColorMap[transaction.status].text
              } text-xs font-medium me-2 px-2.5 py-0.5  rounded-lg rounded-r-lg`}
            >
              {transaction.status}
            </span>
          </div>

          <div
            className={`text-xl font-semibold ${
              transaction.type == "DEBIT"
                ? "text-red-400"
                : transaction.type == "CREDIT"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            ₹{formatAmount(transaction.amount)}
            {transaction.type == "DEBIT" ? (
              <Image
                src="/outgoing.svg"
                alt="eye icon"
                width={20}
                height={20}
                className="inline ml-2"
              />
            ) : transaction.type == "CREDIT" ? (
              <Image
                src="/incoming.svg"
                alt="eye icon"
                width={20}
                height={20}
                className="inline ml-2"
              />
            ) : (
              <Image
                src="/selfgoing.svg"
                alt="eye icon"
                width={20}
                height={20}
                className="inline ml-2"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-purple-200 ">{transaction.note}</p>
          <div className="text-md inline text-purple-100">
            {new Date(transaction.timestamp).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}{" "}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-md inline text-blue-300">
            {transaction.account1.name}{" "}
          </div>
          {transaction.account2 && (
            <Image
              src="/right-arrow.svg"
              alt="arrow icon"
              width={20}
              height={20}
              className="inline mx-2"
            />
          )}
          {transaction.account2 && (
            <div className="text-md inline text-blue-300">
              {transaction.account2.name}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionCard;
