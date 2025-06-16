
import { useState } from "react";
import { X, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  taskTitle: string;
  onPaymentComplete: () => void;
}

const CheckoutModal = ({ isOpen, onClose, amount, taskTitle, onPaymentComplete }: CheckoutModalProps) => {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setError(null);
    
    if (!mpesaNumber.match(/^\d{10,}/)) {
      setError("Please enter a valid Mpesa number");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
      onClose();
      alert(`Payment request sent to ${mpesaNumber}. Please check your phone for the Mpesa prompt.`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Payment Checkout
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-emerald-800 dark:text-emerald-200">Task Payment</span>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">{taskTitle}</p>
            <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">KSh {amount}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mpesa Number
            </label>
            <input
              type="tel"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              placeholder="e.g. 0712345678"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              maxLength={13}
            />
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!mpesaNumber || isProcessing}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {isProcessing ? "Processing..." : `Pay KSh ${amount}`}
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            You will receive an Mpesa prompt on your phone to complete the payment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutModal;
