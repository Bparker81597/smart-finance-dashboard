import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DashboardHeader({ search, onSearchChange }: DashboardHeaderProps) {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold tracking-tight">SmartFinance Dashboard</h1>
      <p className="text-slate-500 mt-1">Manage your finances with ease.</p>
      <div className="relative w-full max-w-md mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search transactions..."
          className="pl-9 rounded-2xl bg-white"
        />
      </div>
    </div>
  );
}
