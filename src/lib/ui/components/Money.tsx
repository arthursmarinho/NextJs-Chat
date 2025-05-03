import clsx from "clsx";

interface MoneyProps {
  amount: number;
  currency?: string;
}

const Money = ({amount, currency = "R$"}: MoneyProps) => {
  return (
    <span
      className={clsx(
        "text-sm font-medium",
        amount < 0 ? "text-red-600" : "text-green-600"
      )}
    >
      {currency} {Math.abs(amount).toFixed(2).replace(".", ",")}
    </span>
  );
};

export default Money;
