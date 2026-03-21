import { useEffect, useMemo, useState, useCallback } from "react";
import { Transaction, TransactionCategory } from "../types/finance";
import { transactionService } from "../services/transactionService";

interface AddTransactionInput {
  merchant: string;
  amount: string;
  category: TransactionCategory;
}

export function useTransactions(userId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      if (!userId) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await transactionService.getTransactions(userId);
        setTransactions(data);
        setHasLoaded(true);
      } catch {
        setError("Unable to load transactions right now.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, [userId]);

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

  const addTransaction = useCallback(async (input: AddTransactionInput): Promise<boolean> => {
    if (!userId) return false;
    const parsedAmount = Number(input.amount);
    if (!input.merchant || Number.isNaN(parsedAmount) || parsedAmount === 0) return false;

    try {
      await transactionService.createTransaction(userId, {
        merchant: input.merchant,
        amount: parsedAmount,
        category: input.category,
      });
      
      // Reload transactions to get the new one with proper ID
      const data = await transactionService.getTransactions(userId);
      setTransactions(data);
      return true;
    } catch (error) {
      console.error("Failed to add transaction:", error);
      setError("Unable to save transaction.");
      return false;
    }
  }, [userId]);

  const deleteTransaction = useCallback(async (transactionId: string): Promise<boolean> => {
    if (!userId) return false;

    try {
      await transactionService.deleteTransaction(userId, transactionId);
      const data = await transactionService.getTransactions(userId);
      setTransactions(data);
      return true;
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      setError("Unable to delete transaction.");
      return false;
    }
  }, [userId]);

  const updateTransaction = useCallback(async (transactionId: string, updates: Partial<Transaction>): Promise<boolean> => {
    if (!userId) return false;

    try {
      await transactionService.updateTransaction(userId, transactionId, updates);
      const data = await transactionService.getTransactions(userId);
      setTransactions(data);
      return true;
    } catch (error) {
      console.error("Failed to update transaction:", error);
      setError("Unable to update transaction.");
      return false;
    }
  }, [userId]);

  return {
    search,
    setSearch,
    filteredTransactions,
    totals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    isLoading: isLoading && !hasLoaded,
    error,
  };
}
