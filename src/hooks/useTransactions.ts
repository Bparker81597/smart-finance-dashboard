import { useEffect, useMemo, useState } from "react";
import { Transaction, TransactionCategory } from "../types/finance";
import { transactionService } from "../services/transactionService";

interface AddTransactionInput {
  merchant: string;
  amount: string;
  category: TransactionCategory;
}

export function useTransactions(search: string) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => transactionService.getTransactions());

  useEffect(() => {
    transactionService.saveTransactions(transactions);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      `${transaction.merchant} ${transaction.category}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return {
      income,
      expenses,
      savings: income - expenses,
      balance: 5420.88,
    };
  }, [transactions]);

  function addTransaction(input: AddTransactionInput): boolean {
    const parsedAmount = Number(input.amount);
    if (!input.merchant || Number.isNaN(parsedAmount) || parsedAmount === 0) {
      return false;
    }

    const newTransaction = transactionService.createTransaction({
      merchant: input.merchant,
      amount: parsedAmount,
      category: input.category,
    });

    setTransactions((prev) => [newTransaction, ...prev]);
    return true;
  }

  return {
    transactions,
    filteredTransactions,
    totals,
    addTransaction,
  };
}
