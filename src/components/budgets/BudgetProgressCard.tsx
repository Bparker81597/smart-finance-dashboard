import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budgetData } from "../../data/mockData";
import { formatCurrency } from "../../utils/currency";

export function BudgetProgressCard() {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Compare current spending against monthly limits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {budgetData.map((item) => {
          const percentage = Math.min((item.spent / item.limit) * 100, 100);
          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className="text-slate-500">{formatCurrency(item.spent)} / {formatCurrency(item.limit)}</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
