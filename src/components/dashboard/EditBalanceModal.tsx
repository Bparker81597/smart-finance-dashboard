import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditBalanceModalProps {
  currentBalance: number;
  onSave: (balance: number) => void;
  onClose: () => void;
}

export function EditBalanceModal({ currentBalance, onSave, onClose }: EditBalanceModalProps) {
  const [balance, setBalance] = useState(currentBalance.toString());

  function handleSave() {
    const parsedBalance = parseFloat(balance);
    if (!isNaN(parsedBalance)) {
      onSave(parsedBalance);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Set Available Balance</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Balance Amount</label>
            <Input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="rounded-xl"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 rounded-xl">
              Save Balance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
