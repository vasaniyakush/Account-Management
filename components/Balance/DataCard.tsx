import { formatAmount } from "../utils";

const DataCard = ({
  label,
  value,
  showBalance,
}: {
  label: string;
  value: string;
  showBalance: boolean;
}) => {
  return (
    <div className="px-2 ">
      <div className="text-md font-bold  text-purple-300">
        {showBalance ? `₹${formatAmount(value)}` : "₹*******"}
      </div>
      <div className="text-sm mt-2 text-purple-300 ">{label}</div>
    </div>
  );
};

export default DataCard;
