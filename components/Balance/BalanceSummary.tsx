import { AnimatePresence, motion } from "motion/react";
import SkeletonCard from "@/components/Balance/SkeletonCard";
import { Summary } from "@/app/types/summary";
import DataCard from "@/components/Balance/DataCard";

export default function BalanceSummary({
  loading,
  data,
  showBalance,
}: {
  loading: boolean;
  data: Summary | undefined;
  showBalance: boolean;
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-800/20 to-white-800/30 py-6 px-2 rounded-lg shadow-lg border border-purple-100 backdrop-blur-md hover:shadow-white-600/40 transition-shadow mt-4 duration-300 max-w-4xl mx-2"
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
              <DataCard
                label="Total Balance"
                value={data?.totalBalance!}
                showBalance={showBalance}
              />
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
                  <DataCard
                    label="Bank"
                    value={data?.totalBankBalance!}
                    showBalance={showBalance}
                  />
                  <DataCard
                    label="Cash"
                    value={data?.totalCashBalance!}
                    showBalance={showBalance}
                  />
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
                    showBalance={showBalance}
                  />
                  <DataCard
                    label="Other"
                    value={data?.totalOtherBalance!}
                    showBalance={showBalance}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
