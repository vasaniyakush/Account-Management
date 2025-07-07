"use client";
import { useEffect, useState } from "react";
import { useDashboardData } from "../api/services/dashboard";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import TransactionList from "@/components/Transactions/TransactionList";
import BalanceSummary from "@/components/Balance/BalanceSummary";
import AccountSummary from "@/components/Accounts/AccountSummary";
import AddTransactionModal from "@/components/Transactions/AddTransactionModal";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { error, data, isFetching, refetch } = useDashboardData(
    //@ts-ignore
    session?.authToken,
    status == "authenticated"
  );
  const loading = status === "loading" || isFetching;
  const [showBalance, setShowBalance] = useState(false);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      console.log("Dashboard data:", data);
    }
  }, [data]);

  return (
    <div className="h-screen">
      <div className="flex flex-row items-center justify-between w-max-xl space-y-2 mt-8 mb-4 px-2">
        <motion.h1 className="text-2xl inline font-bold text-white-300  text-left px-2">
          Balances
        </motion.h1>
        <motion.button
          onClick={() => setShowBalance(!showBalance)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="text-md bg-purple-800/50 border border-purple-500 hover:bg-purple-700/60 focus:bg-purple-700/60 text-white px-3 py-1 mx-2 rounded-sm transition duration-200"
        >
          {showBalance ? "Hide Balance" : "Show Balance"}
          {showBalance ? (
            <Image
              src="/eye-close.svg"
              alt="eye icon"
              width={20}
              height={20}
              className="inline ml-2"
            />
          ) : (
            <Image
              src="/eye-open.svg"
              alt="eye icon"
              width={20}
              height={20}
              className="inline ml-2"
            />
          )}
        </motion.button>
      </div>
      <BalanceSummary loading={loading} data={data} showBalance={showBalance} />
      <AccountSummary loading={loading} data={data} showBalance={showBalance} />
      <div className="flex flex-row items-center justify-between w-max-xl space-y-2 mt-8 mb-4 px-2">
        <motion.h1 className="text-2xl inline font-bold text-white-300  text-left px-2">
          Transactions
        </motion.h1>
        <Link
          href="/accounts"
          className="text-md underline text-white px-3 py-1 mx-2 rounded-sm transition duration-200"
        >
          Trasaction Page
          <Image
            src="/redirect.svg"
            alt="eye icon"
            width={20}
            height={20}
            className="inline ml-2 underline"
          />
        </Link>
      </div>
      <div className="px-2">
        {!loading && (
          <TransactionList
            transactions={data?.transactions!}
            showBalance={showBalance}
          />
        )}
      </div>
      <AddTransactionModal
        isOpen={showAddTransactionModal}
        onClose={() => {
          setShowAddTransactionModal(false), refetch();
        }}
      />
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowAddTransactionModal(true)}
          className="bg-purple-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg "
        >
          Create expense
          <Image
            src="/plus.svg"
            alt="eye icon"
            width={20}
            height={20}
            className="inline ml-2 underline"
          />
        </button>
      </div>{" "}
    </div>
  );
}
