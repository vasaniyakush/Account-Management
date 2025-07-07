import { Summary } from "@/app/types/summary";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import SkeletonAccCard from "@/components/Accounts/SkeletonAccCard";
import AccountAccordion from "@/components/Accounts/AccountAccordion";

export default function AccountSummary({
  loading,
  data,
  showBalance,
}: {
  loading: boolean;
  data: Summary | undefined;
  showBalance: boolean;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-max-xl space-y-2 mt-8 mb-4 px-2">
        <motion.h1 className="text-2xl inline font-bold text-white-300  text-left px-2">
          Accounts
        </motion.h1>
        <Link
          href="/accounts"
          className="text-md underline text-white px-3 py-1 mx-2 rounded-sm transition duration-200"
        >
          Accounts Page
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
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <SkeletonAccCard />
            <SkeletonAccCard />
            <SkeletonAccCard />
          </div>
        ) : (
          data?.accounts?.length === 0 && (
            <div className="text-purple-300 text-center mt-4">
              No accounts found. Please create an account.
            </div>
          )
        )}
        {!loading &&
          data?.accounts?.map((account) => {
            return (
              <AccountAccordion
                account={account}
                showBalance={showBalance}
                key={account.id}
              />
            );
          })}
      </div>
    </>
  );
}
