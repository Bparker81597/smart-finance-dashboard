import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction, TransactionCategory } from "../../types/finance";

interface EditTransactionModalProps {
  transaction: Transaction;
  onSave: (id: string, updates: Partial<Transaction>) => Promise<boolean>;
  onClose: () => void;
}

export function EditTransactionModal({ transaction, onSave, onClose }: EditTransactionModalProps) {
  const [form, setForm] = useState({
    merchant: transaction.merchant,
    amount: transaction.amount.toString(),
    category: transaction.category,
  });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const parsedAmount = Number(form.amount);
    if (!form.merchant || Number.isNaN(parsedAmount) || parsedAmount === 0) return;

    setIsSaving(true);
    const success = await onSave(transaction.id, {
      merchant: form.merchant,
      amount: parsedAmount,
      category: form.category as TransactionCategory,
    });
    setIsSaving(false);

    if (success) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Transaction</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Merchant</label>
            <Input
              value={form.merchant}
              onChange={(e) => setForm((prev) => ({ ...prev, merchant: e.target.value }))}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
              className="rounded-xl"
              placeholder="Negative for expense, positive for income"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as TransactionCategory }))}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white"
            >
              <option>General</option>
              <option>Income</option>
              <option>Groceries</option>
              <option>Utilities</option>
              <option>Transportation</option>
              <option>Shopping</option>
              <option>Subscriptions</option>
              <option>Dining</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="flex-1 rounded-xl">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
