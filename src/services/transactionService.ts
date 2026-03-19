import { initialTransactions } from "../data/mockData";
import { Transaction } from "../types/finance";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "smart-finance-transactions";

export const transactionService = {
  getTransactions(): Transaction[] {
    return loadFromStorage<Transaction[]>(STORAGE_KEY, initialTransactions);
  },

  saveTransactions(transactions: Transaction[]): void {
    saveToStorage(STORAGE_KEY, transactions);
  },

  createTransaction(input: Omit<Transaction, "id" | "date">): Transaction {
    return {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      ...input,
    };
  },
};
