
import { useState } from "react";
import WalletTransactionCard, { Transaction } from "@/components/WalletTransactionCard";
import { Wallet } from "lucide-react";

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", type: "credit", amount: 1000, description: "Task earnings", date: "2025-06-13 12:20" },
  { id: "t2", type: "debit", amount: 600, description: "Errand payout", date: "2025-06-13 17:11" },
  { id: "t3", type: "credit", amount: 250, description: "Task earnings", date: "2025-06-12 09:55" }
];

const WalletPage = () => {
  const [balance] = useState(() => MOCK_TRANSACTIONS.reduce((acc, t) => t.type === "credit" ? acc + t.amount : acc - t.amount, 0));
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const requestPayout = () => {
    setModalOpen(false);
    setTimeout(() => alert(`Ksh ${amount} payout requested to Mpesa! (Mock)`), 350);
    setAmount("");
  };

  return (
    <main className="max-w-xl mx-auto pt-10 px-2">
      <section className="bg-card border shadow-lg rounded-xl p-7 flex flex-col gap-4 items-center mb-8 animate-fade-in">
        <div className="flex gap-2 text-2xl font-bold items-center text-primary">
          <Wallet className="w-8 h-8 mr-2" /> Wallet Balance
        </div>
        <div className="text-4xl font-mono text-emerald-700 mt-1">Ksh {balance}</div>
        <button
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold mt-3 hover-scale transition"
          onClick={() => setModalOpen(true)}
        >
          Request Mpesa Payout
        </button>
      </section>
      <h3 className="font-semibold mb-4 pl-1 text-base text-muted-foreground">Recent Transactions</h3>
      <div className="flex flex-col gap-3">
        {MOCK_TRANSACTIONS.map(t =>
          <WalletTransactionCard key={t.id} transaction={t} />
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center" style={{ backdropFilter: "blur(1.5px)" }}>
          <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-sm animate-scale-in text-center">
            <h4 className="text-lg font-semibold mb-2">Enter Payout Amount</h4>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              placeholder="e.g. 500"
              className="mb-4 px-3 py-2 border rounded w-full text-center"
              min={50}
              max={balance}
            />
            <div className="flex gap-3">
              <button
                className="bg-primary text-primary-foreground rounded px-4 py-2 w-full font-semibold hover:bg-primary/90"
                onClick={requestPayout}
                disabled={!amount || Number(amount) < 50 || Number(amount) > balance}
              >
                Request
              </button>
              <button className="ml-2 px-4 py-2 w-full bg-muted rounded text-muted-foreground" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Payouts to Mpesa (mock). Real money needs full integration.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default WalletPage;
