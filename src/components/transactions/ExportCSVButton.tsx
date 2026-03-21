import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "../../types/finance";

interface ExportCSVButtonProps {
  transactions: Transaction[];
}

export function ExportCSVButton({ transactions }: ExportCSVButtonProps) {
  function handleExport() {
    const headers = ["Date", "Merchant", "Category", "Amount", "Type"];
    const rows = transactions.map((t) => [
      t.date,
      t.merchant,
      t.category,
      Math.abs(t.amount).toFixed(2),
      t.amount > 0 ? "Income" : "Expense",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  }

  return (
    <Button variant="outline" onClick={handleExport} className="rounded-2xl">
      <Download className="h-4 w-4 mr-2" />
      Export CSV
    </Button>
  );
}
