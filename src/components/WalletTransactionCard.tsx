
export interface Transaction {
  id: string;
  type: string; // "credit" | "debit"
  amount: number;
  description: string;
  date: string;
}

const typeColor: Record<string, string> = {
  credit: "bg-green-50 text-green-700",
  debit: "bg-red-50 text-red-700"
};

const WalletTransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <div className={`rounded-md border bg-card py-2 px-4 flex flex-col sm:flex-row gap-1 sm:gap-3 items-start sm:items-center text-sm ${typeColor[transaction.type]}`}>
    <span className="font-bold">{transaction.type === "credit" ? "+" : "-"} Ksh {transaction.amount}</span>
    <span className="">{transaction.description}</span>
    <span className="ml-auto text-xs text-muted-foreground font-mono">{transaction.date}</span>
  </div>
);

export default WalletTransactionCard;
