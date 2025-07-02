"use client";
import { useEffect } from "react";
import { useDashboardData } from "../api/services/dashboard";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Summary } from "../types/summary";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { error, data, isFetching } = useDashboardData(
    //@ts-ignore
    session?.authToken,
    status == "authenticated"
  );
  const loading = status === "loading" || isFetching;

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

  const stats = [
    { label: "Balance", value: `₹${data?.totalBalance}` },
    { label: "Investments", value: `₹${data?.totalInvestments}` },
    { label: "Cash", value: `₹${data?.totalCashBalance}` },
    { label: "Bank", value: `₹${data?.totalBankBalance}` },
    { label: "Other", value: `₹${data?.totalOtherBalance}` },
  ];
  return (
    <div>
      <motion.div
        className="bg-gradient-to-br from-gray-800/30 to-white-800/30 py-6 px-2 rounded-lg shadow-lg border border-purple-100 backdrop-blur-md hover:shadow-white-600/40 transition-shadow mt-4 duration-300 max-w-4xl mx-2"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-4 divide-x divide-purple-100 text-center text-white">
          <div className="col-span-1 self-center">
            <AnimatePresence>
              {loading ? (
                <SkeletonCard />
              ) : (
                <DataCard label="Total Balance" value={data?.totalBalance!} />
              )}
            </AnimatePresence>
          </div>
          <div className="col-span-3 grid grid-rows-2 divide-y px-2 divide-purple-100 text-center text-white">
            <div className="grid grid-cols-2 divide-x pb-2 divide-purple-100">
              <AnimatePresence>
                {loading ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  <>
                    <DataCard label="Bank" value={data?.totalBankBalance!} />
                    <DataCard label="Cash" value={data?.totalCashBalance!} />
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-2 divide-x pt-2 divide-purple-100">
              <AnimatePresence>
                {loading ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  <>
                    <DataCard
                      label="Investments"
                      value={data?.totalInvestments!}
                    />
                    <DataCard label="Other" value={data?.totalOtherBalance!} />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
function SkeletonCard() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 animate-pulse">
      <div className="h-6 w-20 bg-purple-600/30 rounded-md"></div>
      <div className="h-4 w-14 bg-purple-500/20 rounded"></div>
    </div>
  );
}
const DataCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="px-2 ">
      <div className="text-md font-bold  text-purple-300">{`₹${value}`}</div>
      <div className="text-sm mt-2 text-purple-300 ">{label}</div>
    </div>
  );
};
