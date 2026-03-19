import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartData } from "../../data/mockData";
import { formatCurrency } from "../../utils/currency";

export function SpendingChartCard() {
  return (
    <Card className="xl:col-span-2 rounded-2xl shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
        <CardDescription>Track monthly spending patterns.</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Bar dataKey="spending" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
