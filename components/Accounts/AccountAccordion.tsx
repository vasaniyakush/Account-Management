"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Account, accountTypeColorMap } from "@/app/types/account";
import { formatAmount } from "../utils";

const AccountAccordion = ({
  account,
  showBalance,
}: {
  account: Account;
  showBalance: boolean;
}) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-800/20 to-white-800/30 p-4 my-2 rounded-lg shadow-lg border border-purple-100 backdrop-blur-md transition-shadow hover:shadow-white-600/40 duration-300 text-white max-w-xl mx-auto mb-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flow-row justify-between items-center max-w-xl">
        <div className="flex flex-row justify-start items-center gap-3">
          <div className="text-lg inline font-semibold text-purple-200">
            {account.name}
          </div>
          <span
            className={`${accountTypeColorMap[account.accountType].bgColor} ${
              accountTypeColorMap[account.accountType].text
            } text-xs font-medium me-2 px-2.5 py-0.5  rounded-sm `}
          >
            {account.accountType}
          </span>
        </div>
        <div className="text-purple-300 inline text-sm mt-1">
          {showBalance ? `₹${formatAmount(account.balance)}` : "₹*******"}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountAccordion;
