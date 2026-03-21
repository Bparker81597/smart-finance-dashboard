import { useState } from "react";
import { Bell, Check, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Transaction } from "../../types/finance";

interface NotificationsPopoverProps {
  transactions: Transaction[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "success" | "info";
  date: string;
}

export function NotificationsPopover({ transactions }: NotificationsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthTransactions = transactions.filter((t) =>
    t.date.startsWith(currentMonth)
  );

  const expenses = currentMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const income = currentMonthTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expenses;

  const notifications: Notification[] = [
    {
      id: "1",
      title: savings >= 0 ? "On Track! 🎉" : "Budget Alert",
      message: savings >= 0
        ? `You've saved ${savings >= 0 ? "$" + savings.toFixed(2) : "$0"} this month!`
        : `You're $${Math.abs(savings).toFixed(2)} over budget this month.`,
      type: savings >= 0 ? "success" : "alert",
      date: new Date().toLocaleDateString(),
    },
    {
      id: "2",
      title: "Transaction Summary",
      message: `You've made ${currentMonthTransactions.length} transactions this month.`,
      type: "info",
      date: new Date().toLocaleDateString(),
    },
  ];

  // Add alert for high spending categories
  const categorySpending = currentMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const budgetLimits: Record<string, number> = {
    Groceries: 600,
    Transportation: 250,
    Shopping: 400,
    Utilities: 250,
    Dining: 200,
    Subscriptions: 100,
    General: 300,
  };

  Object.entries(categorySpending).forEach(([category, spent]) => {
    const limit = budgetLimits[category];
    if (limit && spent > limit * 0.9) {
      notifications.push({
        id: `cat-${category}`,
        title: `High ${category} Spending`,
        message: `You've spent $${spent.toFixed(2)} of $${limit} budget (${Math.round((spent / limit) * 100)}%)`,
        type: "alert",
        date: new Date().toLocaleDateString(),
      });
    }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "success":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="rounded-2xl h-10 px-4 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-4 w-4 mr-2" />
        Notifications
        {notifications.some((n) => n.type === "alert") && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg border-slate-200">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <Check className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-slate-50 hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {notification.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
