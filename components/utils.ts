export const formatAmount = (value: string) => {
  if (!value) return "";

  const [intPart, decimalPart] = value.replace(/,/g, "").split(".");
  const num = Number(intPart);

  if (isNaN(num)) return "";

  const formattedInt = num.toLocaleString("en-IN");

  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart}`
    : formattedInt;
};

export const parseAmount = (formatted: string) => {
  return formatted.replace(/,/g, "");
};
