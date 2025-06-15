
import { useState } from "react";
import WalletTransactionCard, { Transaction } from "@/components/WalletTransactionCard";
import { Wallet } from "lucide-react";

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", type: "credit", amount: 1000, description: "Task earnings", date: "2025-06-13 12:20" },
  { id: "t2", type: "debit", amount: 600, description: "Errand payout", date: "2025-06-13 17:11" },
  { id: "t3", type: "credit", amount: 250, description: "Task earnings", date: "2025-06-12 09:55" }
];

const WalletPage = () => {
  const role = localStorage.getItem("role") === "errander" ? "errander" : "customer";
  const [balance, setBalance] = useState(
    MOCK_TRANSACTIONS.reduce((acc, t) => t.type === "credit" ? acc + t.amount : acc - t.amount, 0)
  );
  const [mpesa, setMpesa] = useState("");
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const withdraw = () => {
    setErr(null);
    if (!mpesa.match(/^\d{10,}/)) {
      setErr("Enter a valid Mpesa number.");
      return;
    }
    if (!amount || Number(amount) < 50 || Number(amount) > balance) {
      setErr("Enter a valid amount.");
      return;
    }
    setBalance(b => b - Number(amount));
    setMpesa("");
    setAmount("");
    setTimeout(() => alert(`Withdrew Ksh ${amount} to ${mpesa}. (Mock)`), 350);
  };

  return (
    <main className="max-w-xl mx-auto pt-10 px-2">
      <section className="bg-card border shadow-lg rounded-xl p-7 flex flex-col gap-4 items-center mb-8 animate-fade-in">
        <div className="flex gap-2 text-2xl font-bold items-center text-primary">
          <Wallet className="w-8 h-8 mr-2" /> Wallet Balance
        </div>
        <div className="text-4xl font-mono text-emerald-700 mt-1">Ksh {balance}</div>
        {role === "errander" && (
          <div className="w-full flex flex-col gap-4 mt-3 bg-muted/60 rounded-xl p-5 shadow-inner border">
            <div>
              <label className="font-semibold block text-muted-foreground mb-1">Mpesa Number</label>
              <input
                value={mpesa}
                onChange={e => setMpesa(e.target.value)}
                type="tel"
                placeholder="e.g. 0712345678"
                className="px-3 py-2 border rounded w-full"
                maxLength={13}
              />
            </div>
            <div>
              <label className="font-semibold block text-muted-foreground mb-1">Withdraw Amount (Ksh)</label>
              <input
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/\D/, ""))}
                type="number"
                placeholder="Min 50"
                className="px-3 py-2 border rounded w-full"
                min={50}
                max={balance}
              />
            </div>
            <button
              className="bg-primary text-primary-foreground rounded py-2 font-semibold mt-1 transition hover:bg-primary/80"
              onClick={withdraw}
              disabled={!mpesa || !amount || Number(amount) < 50 || Number(amount) > balance}
            >
              Withdraw to Mpesa
            </button>
            {err && <div className="text-red-600 font-medium">{err}</div>}
            <p className="text-xs text-muted-foreground">Withdrawals are mock. Real payout integration coming soon.</p>
          </div>
        )}
      </section>
      <h3 className="font-semibold mb-4 pl-1 text-base text-muted-foreground">Recent Transactions</h3>
      <div className="flex flex-col gap-3">
        {MOCK_TRANSACTIONS.map(t =>
          <WalletTransactionCard key={t.id} transaction={t} />
        )}
      </div>
    </main>
  );
};

export default WalletPage;
