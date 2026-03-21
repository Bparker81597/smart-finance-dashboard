import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { Transaction } from "../../types/finance";
import { formatCurrency } from "../../utils/currency";

interface SpendingChartCardProps {
  transactions: Transaction[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1", "#14b8a6"];

export function SpendingChartCard({ transactions }: SpendingChartCardProps) {
  // Get last 6 months of spending data
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toISOString().slice(0, 7);
    const monthName = date.toLocaleDateString("en-US", { month: "short" });

    const spending = transactions
      .filter((t) => t.date.startsWith(monthKey) && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return { month: monthName, spending };
  }).reverse();

  // Category breakdown for current month
  const currentMonth = new Date().toISOString().slice(0, 7);
  const categoryData = Object.entries(
    transactions
      .filter((t) => t.date.startsWith(currentMonth) && t.amount < 0)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const totalSpending = categoryData.reduce((sum, c) => sum + c.value, 0);

  return (
    <Card className="xl:col-span-2 rounded-2xl shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
        <CardDescription>Track monthly spending patterns and category breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="spending" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {categoryData.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-4 text-slate-700">This Month by Category</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-slate-500 mt-2">
              Total: {formatCurrency(totalSpending)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
