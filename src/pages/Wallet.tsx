
import { useState } from "react";
import WalletTransactionCard, { Transaction } from "@/components/WalletTransactionCard";
import { Wallet, Smartphone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const withdraw = async () => {
    setErr(null);
    if (!mpesa.match(/^\d{10,}/)) {
      setErr("Enter a valid Mpesa number.");
      return;
    }
    if (!amount || Number(amount) < 50 || Number(amount) > balance) {
      setErr("Enter a valid amount (minimum KSh 50).");
      return;
    }

    setIsProcessing(true);
    
    // Simulate withdrawal processing
    setTimeout(() => {
      setBalance(b => b - Number(amount));
      setMpesa("");
      setAmount("");
      setIsProcessing(false);
      alert(`Withdrawal of KSh ${amount} to ${mpesa} processed successfully! Check your phone for confirmation.`);
    }, 2500);
  };

  return (
    <main className="max-w-xl mx-auto pt-10 px-2">
      <Card className="bg-card border shadow-lg rounded-xl p-7 flex flex-col gap-4 items-center mb-8 animate-fade-in">
        <div className="flex gap-2 text-2xl font-bold items-center text-primary">
          <Wallet className="w-8 h-8 mr-2" /> Wallet Balance
        </div>
        <div className="text-4xl font-mono text-emerald-700 dark:text-emerald-400 mt-1">
          KSh {balance.toLocaleString()}
        </div>
        
        {role === "errander" && (
          <Card className="w-full mt-3 bg-muted/60 dark:bg-gray-800/60 rounded-xl shadow-inner border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Withdraw to Mpesa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="font-semibold block text-muted-foreground mb-1">
                  <Smartphone className="w-4 h-4 inline mr-1" />
                  Mpesa Number
                </label>
                <input
                  value={mpesa}
                  onChange={e => setMpesa(e.target.value)}
                  type="tel"
                  placeholder="e.g. 0712345678"
                  className="px-3 py-2 border rounded w-full bg-background dark:bg-gray-700 dark:border-gray-600"
                  maxLength={13}
                  disabled={isProcessing}
                />
              </div>
              
              <div>
                <label className="font-semibold block text-muted-foreground mb-1">
                  Withdraw Amount (KSh)
                </label>
                <input
                  value={amount}
                  onChange={e => setAmount(e.target.value.replace(/\D/, ""))}
                  type="number"
                  placeholder="Min 50"
                  className="px-3 py-2 border rounded w-full bg-background dark:bg-gray-700 dark:border-gray-600"
                  min={50}
                  max={balance}
                  disabled={isProcessing}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Available: KSh {balance.toLocaleString()}
                </p>
              </div>
              
              <Button
                className="w-full bg-primary text-primary-foreground rounded py-2 font-semibold mt-1 transition hover:bg-primary/80"
                onClick={withdraw}
                disabled={!mpesa || !amount || Number(amount) < 50 || Number(amount) > balance || isProcessing}
              >
                {isProcessing ? "Processing Withdrawal..." : "Withdraw to Mpesa"}
              </Button>
              
              {err && <div className="text-red-600 dark:text-red-400 font-medium">{err}</div>}
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  You'll receive an SMS confirmation once the withdrawal is processed
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </Card>
      
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
