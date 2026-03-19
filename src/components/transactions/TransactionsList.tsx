import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign } from "lucide-react";
import { Transaction } from "../../types/finance";
import { formatCurrency } from "../../utils/currency";

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Searchable transaction list with reusable UI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction) => {
          const isIncome = transaction.amount > 0;
          return (
            <div key={transaction.id} className="flex items-center justify-between border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${isIncome ? "bg-emerald-100" : "bg-slate-100"}`}>
                  {isIncome ? <DollarSign className="h-5 w-5 text-emerald-600" /> : <CreditCard className="h-5 w-5 text-slate-600" />}
                </div>
                <div>
                  <p className="font-medium">{transaction.merchant}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="rounded-xl">{transaction.category}</Badge>
                    <span className="text-xs text-slate-500">{transaction.date}</span>
                  </div>
                </div>
              </div>
              <p className={`font-semibold ${isIncome ? "text-emerald-600" : "text-slate-900"}`}>
                {isIncome ? "+" : "-"}{formatCurrency(Math.abs(transaction.amount))}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
