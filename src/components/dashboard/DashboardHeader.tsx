import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DashboardHeader({ search, onSearchChange }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-semibold">
          SF
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SmartFinance Dashboard</h1>
          <p className="text-slate-500 mt-1">Backend-ready fintech portfolio starter.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search transactions"
            className="pl-9 rounded-2xl bg-white"
          />
        </div>
        <Button variant="outline" className="rounded-2xl h-10 px-4">
          <Bell className="h-4 w-4 mr-2" /> Notifications
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarFallback>BP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
