import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, PiggyBank, Wallet, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStat } from "../components/dashboard/DashboardStat";
import { SpendingChartCard } from "../components/dashboard/SpendingChartCard";
import { AddTransactionCard } from "../components/dashboard/AddTransactionCard";
import { TransactionsList } from "../components/transactions/TransactionsList";
import { BudgetProgressCard } from "../components/budgets/BudgetProgressCard";
import { InsightsGrid } from "../components/insights/InsightsGrid";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/currency";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const { filteredTransactions, totals, addTransaction } = useTransactions(search);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        <DashboardHeader search={search} onSearchChange={setSearch} />

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <DashboardStat title="Available Balance" value={formatCurrency(totals.balance)} icon={Wallet} change="Updated today" />
          <DashboardStat title="Monthly Income" value={formatCurrency(totals.income)} icon={ArrowUpRight} change="+4.2% vs last month" />
          <DashboardStat title="Monthly Spending" value={formatCurrency(totals.expenses)} icon={ArrowDownRight} change="-2.1% vs last month" />
          <DashboardStat title="Estimated Savings" value={formatCurrency(totals.savings)} icon={PiggyBank} change="On track this month" />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <SpendingChartCard />
          <AddTransactionCard onAddTransaction={addTransaction} />
        </section>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="rounded-2xl bg-slate-200/70">
            <TabsTrigger value="transactions" className="rounded-2xl">Transactions</TabsTrigger>
            <TabsTrigger value="budgets" className="rounded-2xl">Budgets</TabsTrigger>
            <TabsTrigger value="insights" className="rounded-2xl">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <TransactionsList transactions={filteredTransactions} />
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetProgressCard />
          </TabsContent>

          <TabsContent value="insights">
            <InsightsGrid />
          </TabsContent>
        </Tabs>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Engineering Notes
              </CardTitle>
              <CardDescription>Use these points when explaining the project.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-3 leading-6">
              <p>• The transactions feature is backed by a dedicated service and custom hook.</p>
              <p>• Local storage persistence simulates real application state retention.</p>
              <p>• The structure is intentionally prepared for API or Firebase integration.</p>
              <p>• UI rendering is separated from data logic to keep the app maintainable.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Next Backend Steps</CardTitle>
              <CardDescription>Best upgrades for a stronger engineering story.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-3 leading-6">
              <p>1. Add Firebase Authentication</p>
              <p>2. Move transactions from local storage to Firestore</p>
              <p>3. Add route protection and user-based data isolation</p>
              <p>4. Add loading, empty, and error states</p>
              <p>5. Deploy to Vercel and link it in the README</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
